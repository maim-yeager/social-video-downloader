<div align="center">

# ðŸŽ¬ Universal Social Media Video Downloader API

**A powerful, lightweight REST API built with Node.js & Express.js**  
**to download videos from YouTube, TikTok, Instagram, and Facebook â€” using a single unified endpoint.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()
[![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?logo=render)](https://render.com)

---

*Developed & maintained by **Maim Islam***

</div>

---

## ðŸ“Œ Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Supported Platforms](#-supported-platforms)
- [API Reference](#-api-reference)
- [Response Format](#-response-format)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)
- [Deployment on Render](#-deployment-on-render)
- [Tech Stack](#-tech-stack)
- [Important Notes](#-important-notes)
- [Developer](#-developer)

---

## ðŸŒ Overview

The **Universal Social Media Video Downloader API** is a backend service that accepts any supported social media video URL and returns a direct download link along with the video title and thumbnail â€” all in a clean JSON response.

No frontend needed. No API keys required. Just send a URL and get a downloadable link back.

---

## âœ¨ Features

- ðŸ”— **Single Endpoint** â€” One route handles all platforms
- ðŸ¤– **Auto Platform Detection** â€” Automatically identifies YouTube, TikTok, Instagram, and Facebook URLs
- ðŸš« **No Watermark** â€” TikTok videos are returned without watermarks
- ðŸ“º **HD Support** â€” Fetches highest available quality for Facebook and YouTube
- âš¡ **Fast & Lightweight** â€” Minimal dependencies, optimized for speed
- ðŸŒ **CORS Enabled** â€” Ready for cross-origin frontend integrations
- ðŸ›¡ï¸ **Error Handling** â€” Graceful responses for invalid URLs, unsupported platforms, and network failures
- â˜ï¸ **Deploy-Ready** â€” Configured for instant deployment on Render

---

## âœ… Supported Platforms

| Platform     | Content Type           | Special Feature           |
|--------------|------------------------|---------------------------|
| ðŸŽ¥ YouTube   | Videos & Shorts        | Max quality download      |
| ðŸŽµ TikTok    | All public videos      | **No watermark**          |
| ðŸ“¸ Instagram | Reels & Post videos    | Multi-quality support     |
| ðŸ‘¥ Facebook  | Public watch videos    | **HD preferred over SD**  |

---

## ðŸ“¡ API Reference

### Base URL
```
https://your-api-name.onrender.com
```

---

### `GET /`
Health check â€” returns API status and usage instructions.

**Response:**
```json
{
  "status": "online",
  "name": "Universal Social Media Video Downloader API",
  "version": "1.0.0",
  "usage": "/download?url=VIDEO_URL",
  "supported_platforms": ["YouTube", "TikTok", "Instagram", "Facebook"]
}
```

---

### `GET /download?url=VIDEO_URL`
Main download endpoint. Accepts any supported video URL.

**Query Parameters:**

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| `url`     | string | âœ… Yes   | Full URL of the video |

**Example Requests:**
```bash
# YouTube
GET /download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ

# YouTube Shorts
GET /download?url=https://www.youtube.com/shorts/abc123

# TikTok
GET /download?url=https://www.tiktok.com/@username/video/1234567890

# Instagram Reel
GET /download?url=https://www.instagram.com/reel/ABC123xyz/

# Facebook Video
GET /download?url=https://www.facebook.com/watch/?v=987654321
```

---

## ðŸ“¦ Response Format

### âœ… Success
```json
{
  "status": "success",
  "platform": "tiktok",
  "title": "This is the video title",
  "thumbnail": "https://cdn.example.com/thumbnail.jpg",
  "download": "https://cdn.example.com/video.mp4"
}
```

### âŒ Error â€” Unsupported Platform
```json
{
  "status": "error",
  "message": "Unsupported platform. Supported: Instagram, TikTok, Facebook, YouTube"
}
```

### âŒ Error â€” Invalid URL
```json
{
  "status": "error",
  "message": "Invalid URL format"
}
```

### âŒ Error â€” Missing Parameter
```json
{
  "status": "error",
  "message": "Missing 'url' query parameter. Usage: /download?url=VIDEO_URL"
}
```

### âŒ Error â€” Extraction Failure
```json
{
  "status": "error",
  "platform": "instagram",
  "message": "Instagram extraction failed: <reason>"
}
```

---

## ðŸ“ Project Structure

```
social-video-downloader/
â”‚
â”œâ”€â”€ server.js          â† Main API server (platform handlers + routing)
â”œâ”€â”€ package.json       â† Project metadata & dependencies
â”œâ”€â”€ .gitignore         â† Git ignore rules (excludes node_modules)
â””â”€â”€ README.md          â† Project documentation (this file)
```

---

## ðŸ› ï¸ Local Development

Follow these steps to run the API on your local machine.

### Prerequisites
- Node.js v18 or later â†’ [Download here](https://nodejs.org)
- npm (comes with Node.js)
- Git â†’ [Download here](https://git-scm.com)

---

### Step 1 â€” Clone or create the project

```bash
mkdir social-video-downloader
cd social-video-downloader
```

Copy `server.js`, `package.json`, `.gitignore`, and `README.md` into the folder.

---

### Step 2 â€” Install dependencies

```bash
npm install
```

This installs: `express`, `axios`, and `cors`.

---

### Step 3 â€” Start the development server

```bash
npm start
```

The API will be live at:
```
http://localhost:3000
```

Test it immediately:
```
http://localhost:3000/download?url=https://www.tiktok.com/@user/video/123
```

---

## â˜ï¸ Deployment on Render

Render offers **free hosting** for Node.js APIs. Follow these steps to deploy.

---

### Step 1 â€” Prepare your GitHub repository

```bash
# Initialize git
git init
git add .
git commit -m "feat: initial release - Universal Social Video Downloader API"

# Push to GitHub (create repo at github.com/new first)
git remote add origin https://github.com/YOUR_USERNAME/social-video-downloader.git
git branch -M main
git push -u origin main
```

---

### Step 2 â€” Sign up on Render

Go to ðŸ‘‰ **https://render.com** â†’ Click **"Get Started for Free"**

> ðŸ’¡ Tip: Sign up with your GitHub account for seamless repository access.

---

### Step 3 â€” Create a New Web Service

1. On the Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect a repository"**

---

### Step 4 â€” Connect your GitHub repository

1. Authorize Render to access your GitHub account
2. Search for `social-video-downloader`
3. Click **"Connect"**

---

### Step 5 â€” Configure deployment settings

| Setting           | Value                     |
|-------------------|---------------------------|
| **Name**          | `social-video-downloader` |
| **Region**        | Closest to your users     |
| **Branch**        | `main`                    |
| **Runtime**       | `Node`                    |
| **Build Command** | `npm install`             |
| **Start Command** | `npm start`               |
| **Instance Type** | `Free`                    |

---

### Step 6 â€” Environment Variables

No manual environment variables are needed.

> Render automatically injects the `PORT` variable. The server is pre-configured to read `process.env.PORT`.

---

### Step 7 â€” Deploy

Click **"Create Web Service"**.

Render will:
1. Clone your GitHub repository
2. Execute `npm install`
3. Execute `npm start`
4. Assign a live public URL

> â±ï¸ First deployment typically takes **2â€“4 minutes**.

---

### Step 8 â€” Verify the deployment

Once the dashboard shows **ðŸŸ¢ Live**, your API is publicly accessible:

```
https://social-video-downloader.onrender.com/download?url=VIDEO_URL
```

**Test with curl:**
```bash
curl "https://social-video-downloader.onrender.com/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

**Or open directly in your browser:**
```
https://social-video-downloader.onrender.com/
```

---

### ðŸ”„ Auto-Deploy on Updates

Every time you push to the `main` branch, Render automatically redeploys:

```bash
git add .
git commit -m "fix: update handler"
git push
```

---

## ðŸ§° Tech Stack

| Technology        | Purpose                             |
|-------------------|-------------------------------------|
| **Node.js v18+**  | JavaScript runtime environment      |
| **Express.js**    | Web framework & routing             |
| **Axios**         | HTTP client for external API calls  |
| **CORS**          | Cross-Origin Resource Sharing       |
| **cobalt.tools**  | YouTube & Instagram fallback engine |
| **tikwm.com**     | TikTok no-watermark downloader      |
| **fastdl.app**    | Instagram Reels & post downloader   |
| **getfvid.com**   | Facebook HD/SD video extractor      |

---

## âš ï¸ Important Notes

> Please read before deploying to production.

- **Free Tier Sleep:** Render's free tier suspends the service after 15 minutes of inactivity. The first request after a sleep period may take up to 30 seconds to respond.
- **Public Videos Only:** Only publicly accessible videos can be downloaded. Private, restricted, or age-gated content will return an error.
- **Third-Party Services:** This API depends on free third-party services. They may have rate limits or occasional downtime.
- **Production Use:** For high-traffic or commercial use, upgrade to Render's paid tier and consider self-hosting `yt-dlp`.
- **Legal Responsibility:** Always respect the Terms of Service of each platform. Download only content you have the right to download.

---

## ðŸ‘¨â€ðŸ’» Developer

<div align="center">

### Maim Islam

*Full Stack Developer & API Engineer*

---

*"Building clean, efficient, and scalable backend solutions."*

---

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?logo=github&style=for-the-badge)](https://github.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&style=for-the-badge)](https://linkedin.com)

</div>

---

## ðŸ“„ License

This project is licensed under the **MIT License** â€” you are free to use, modify, and distribute it with attribution.

---

<div align="center">

**Made with â¤ï¸ by Maim Islam**

â­ *If this project helped you, consider giving it a star on GitHub!*

</div>
