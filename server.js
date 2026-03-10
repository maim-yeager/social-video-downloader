const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
//  PLATFORM DETECTION
// ─────────────────────────────────────────────
function detectPlatform(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("tiktok.com") || host.includes("vm.tiktok.com")) return "tiktok";
    if (host.includes("facebook.com") || host.includes("fb.watch")) return "facebook";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";

    return null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
//  SHARED: call yt-dlp via RapidAPI or a
//  self-hosted yt-dlp wrapper.
//  We use the free "yt-dlp-api" approach via
//  the public no-key yt-dlp web endpoint.
// ─────────────────────────────────────────────
async function ytDlpFetch(videoUrl) {
  // Using the public yt-dlp REST service at cobalt.tools API (no key needed)
  const response = await axios.post(
    "https://api.cobalt.tools/api/json",
    {
      url: videoUrl,
      vCodec: "h264",
      vQuality: "max",
      aFormat: "mp3",
      filenamePattern: "pretty",
      isAudioOnly: false,
      disableMetadata: false,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );
  return response.data;
}

// ─────────────────────────────────────────────
//  YOUTUBE HANDLER
// ─────────────────────────────────────────────
async function handleYouTube(url) {
  try {
    // Extract video ID
    let videoId = null;
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1).split("?")[0];
    } else {
      videoId = urlObj.searchParams.get("v");
      if (!videoId) {
        // Handle /shorts/VIDEO_ID
        const match = urlObj.pathname.match(/\/shorts\/([^/]+)/);
        if (match) videoId = match[1];
      }
    }

    if (!videoId) throw new Error("Could not extract YouTube video ID");

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Use cobalt.tools for actual download link
    const cobalt = await ytDlpFetch(url);

    if (cobalt.status === "error") {
      throw new Error(cobalt.text || "cobalt API error");
    }

    // cobalt returns either a direct "stream" url or a "picker" list
    let downloadUrl = null;
    let title = cobalt.filename || `YouTube Video (${videoId})`;

    if (cobalt.status === "stream" || cobalt.status === "redirect") {
      downloadUrl = cobalt.url;
    } else if (cobalt.status === "picker" && cobalt.picker?.length) {
      downloadUrl = cobalt.picker[0].url;
    } else {
      throw new Error("No download URL found");
    }

    return {
      status: "success",
      platform: "youtube",
      title,
      thumbnail,
      download: downloadUrl,
    };
  } catch (err) {
    throw new Error(`YouTube extraction failed: ${err.message}`);
  }
}

// ─────────────────────────────────────────────
//  TIKTOK HANDLER
// ─────────────────────────────────────────────
async function handleTikTok(url) {
  try {
    // Use tikwm.com API — free, no key required, returns no-watermark video
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, { timeout: 20000 });
    const data = response.data;

    if (!data || data.code !== 0) {
      throw new Error(data?.msg || "TikTok API error");
    }

    const video = data.data;
    const downloadUrl = video.play || video.wmplay; // play = no watermark

    return {
      status: "success",
      platform: "tiktok",
      title: video.title || "TikTok Video",
      thumbnail: video.cover || video.origin_cover || "",
      download: downloadUrl,
    };
  } catch (err) {
    throw new Error(`TikTok extraction failed: ${err.message}`);
  }
}

// ─────────────────────────────────────────────
//  INSTAGRAM HANDLER
// ─────────────────────────────────────────────
async function handleInstagram(url) {
  try {
    // Use the instavideosave / snapinsta style scraper via a public API
    // instagramvideodownloader4 or fastdl
    const apiUrl = `https://fastdl.app/api/convert`;
    const response = await axios.post(
      apiUrl,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://fastdl.app",
          Referer: "https://fastdl.app/",
        },
        timeout: 20000,
      }
    );

    const data = response.data;

    if (!data || !data.url || data.url.length === 0) {
      // Fallback: try cobalt
      const cobalt = await ytDlpFetch(url);
      if (cobalt.status === "stream" || cobalt.status === "redirect") {
        return {
          status: "success",
          platform: "instagram",
          title: cobalt.filename || "Instagram Video",
          thumbnail: "",
          download: cobalt.url,
        };
      }
      throw new Error("No download link found");
    }

    // Pick highest quality (last item is usually highest)
    const downloads = data.url;
    const best = downloads[downloads.length - 1];

    return {
      status: "success",
      platform: "instagram",
      title: data.title || "Instagram Video",
      thumbnail: data.thumb || "",
      download: best.url,
    };
  } catch (err) {
    throw new Error(`Instagram extraction failed: ${err.message}`);
  }
}

// ─────────────────────────────────────────────
//  FACEBOOK HANDLER
// ─────────────────────────────────────────────
async function handleFacebook(url) {
  try {
    // Use getfvid API — free and reliable for public Facebook videos
    const apiUrl = `https://getfvid.com/downloader`;
    const params = new URLSearchParams();
    params.append("url", url);
    params.append("submit", "Download");

    const response = await axios.post(apiUrl, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36",
        Referer: "https://getfvid.com/",
      },
      timeout: 20000,
    });

    const html = response.data;

    // Extract HD/SD links from the response HTML
    const hdMatch = html.match(/href="(https:\/\/[^"]+?)"[^>]*>\s*HD/i);
    const sdMatch = html.match(/href="(https:\/\/[^"]+?)"[^>]*>\s*SD/i);
    const thumbMatch = html.match(/<img[^>]+src="(https:\/\/[^"]+?)"[^>]*class="[^"]*thumb/i);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);

    const downloadUrl = hdMatch?.[1] || sdMatch?.[1];

    if (!downloadUrl) {
      // Fallback: cobalt
      const cobalt = await ytDlpFetch(url);
      if (cobalt.status === "stream" || cobalt.status === "redirect") {
        return {
          status: "success",
          platform: "facebook",
          title: "Facebook Video",
          thumbnail: "",
          download: cobalt.url,
        };
      }
      throw new Error("No download link found");
    }

    return {
      status: "success",
      platform: "facebook",
      title: titleMatch?.[1]?.replace(" - GetFVid", "").trim() || "Facebook Video",
      thumbnail: thumbMatch?.[1] || "",
      download: downloadUrl,
      quality: hdMatch ? "HD" : "SD",
    };
  } catch (err) {
    throw new Error(`Facebook extraction failed: ${err.message}`);
  }
}

// ─────────────────────────────────────────────
//  MAIN DOWNLOAD ENDPOINT
// ─────────────────────────────────────────────
app.get("/download", async (req, res) => {
  const { url } = req.query;

  // Validate presence
  if (!url) {
    return res.status(400).json({
      status: "error",
      message: "Missing 'url' query parameter. Usage: /download?url=VIDEO_URL",
    });
  }

  // Validate format
  try {
    new URL(url);
  } catch {
    return res.status(400).json({
      status: "error",
      message: "Invalid URL format",
    });
  }

  // Detect platform
  const platform = detectPlatform(url);

  if (!platform) {
    return res.status(400).json({
      status: "error",
      message:
        "Unsupported platform. Supported: Instagram, TikTok, Facebook, YouTube",
    });
  }

  try {
    let result;

    switch (platform) {
      case "youtube":
        result = await handleYouTube(url);
        break;
      case "tiktok":
        result = await handleTikTok(url);
        break;
      case "instagram":
        result = await handleInstagram(url);
        break;
      case "facebook":
        result = await handleFacebook(url);
        break;
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      platform,
      message: err.message,
    });
  }
});

// ─────────────────────────────────────────────
//  HEALTH CHECK
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "online",
    name: "Universal Social Media Video Downloader API",
    version: "1.0.0",
    usage: "/download?url=VIDEO_URL",
    supported_platforms: ["YouTube", "TikTok", "Instagram", "Facebook"],
    example:
      "/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });
});

// ─────────────────────────────────────────────
//  START SERVER
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API ready at: http://localhost:${PORT}/download?url=VIDEO_URL`);
});
