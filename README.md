# 🎬 Universal Social Media Video Downloader API

A Node.js + Express API that downloads videos from **YouTube, TikTok, Instagram, and Facebook** using a single endpoint.

---

## 🚀 Quick Usage

```
GET /download?url=VIDEO_URL
```

**Example:**
```
https://your-api.onrender.com/download?url=https://www.tiktok.com/@user/video/123456
```

**Success Response:**
```json
{
  "status": "success",
  "platform": "tiktok",
  "title": "Video Title Here",
  "thumbnail": "https://thumbnail-link.jpg",
  "download": "https://direct-video-link.mp4"
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Unsupported platform"
}
```

---

## ✅ Supported Platforms

| Platform  | Support                          |
|-----------|----------------------------------|
| YouTube   | Videos + Shorts                  |
| TikTok    | No-watermark video               |
| Instagram | Reels + Post videos              |
| Facebook  | HD video (when available)        |

---

## 📁 Project Structure

```
social-video-downloader/
├── server.js        ← Main API server
├── package.json     ← Dependencies
├── .gitignore       ← Git ignore rules
└── README.md        ← This file
```

---

## 🛠️ Run Locally

### Step 1 — Install Node.js
Download and install Node.js (v18 or later) from:
👉 https://nodejs.org

Verify installation:
```bash
node -v   # Should show v18+
npm -v
```

### Step 2 — Create project folder
```bash
mkdir social-video-downloader
cd social-video-downloader
```

### Step 3 — Add the files
Copy `server.js`, `package.json`, and `.gitignore` into the folder.

### Step 4 — Install dependencies
```bash
npm install
```

### Step 5 — Start the server
```bash
npm start
```

The API will be available at:
```
http://localhost:3000/download?url=VIDEO_URL
```

---

## ☁️ Deploy on Render (Free Hosting)

### Step 1 — Push code to GitHub

Initialize a git repository and push your code:
```bash
git init
git add .
git commit -m "Initial commit - Social Video Downloader API"
```

Create a new repository on GitHub at https://github.com/new

Then push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/social-video-downloader.git
git branch -M main
git push -u origin main
```

---

### Step 2 — Create a Render account

Go to 👉 https://render.com and sign up for a free account.
You can sign up using your GitHub account for easier integration.

---

### Step 3 — Create a new Web Service

1. On your Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect a repository"**

---

### Step 4 — Connect your GitHub repository

1. If not already connected, click **"Connect GitHub"** and authorize Render
2. Find and select your `social-video-downloader` repository
3. Click **"Connect"**

---

### Step 5 — Configure the Web Service

Fill in the settings as follows:

| Setting         | Value                          |
|-----------------|-------------------------------|
| **Name**        | `social-video-downloader` (or any name) |
| **Region**      | Choose closest to your users  |
| **Branch**      | `main`                        |
| **Runtime**     | `Node`                        |
| **Build Command** | `npm install`               |
| **Start Command** | `npm start`                 |

Under **Instance Type**, select **Free** (sufficient for testing).

---

### Step 6 — Environment Settings

No environment variables are required.

Render automatically sets the `PORT` environment variable — the server already reads `process.env.PORT` so this works out of the box.

---

### Step 7 — Deploy

Click **"Create Web Service"**.

Render will:
1. Pull your code from GitHub
2. Run `npm install`
3. Run `npm start`
4. Give you a live URL like: `https://social-video-downloader.onrender.com`

Deployment takes **2–4 minutes** on first run.

---

### Step 8 — Test the live API

Once deployed, test it in your browser or with curl:

```bash
# YouTube
curl "https://your-api.onrender.com/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# TikTok
curl "https://your-api.onrender.com/download?url=https://www.tiktok.com/@username/video/1234567890"

# Instagram
curl "https://your-api.onrender.com/download?url=https://www.instagram.com/reel/ABC123/"

# Facebook
curl "https://your-api.onrender.com/download?url=https://www.facebook.com/watch/?v=123456789"
```

---

## ⚠️ Important Notes

- **Free Render tier** spins down after 15 minutes of inactivity. The first request after sleep may take ~30 seconds.
- This API relies on third-party free services (cobalt.tools, tikwm.com, etc.) which may have rate limits.
- For production use, consider upgrading to Render's paid tier or self-hosting yt-dlp.
- Only **public** videos can be downloaded. Private/restricted videos will return an error.

---

## 📡 API Endpoints

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/`                         | Health check + usage info |
| GET    | `/download?url=VIDEO_URL`   | Download any video      |

---

## 🧰 Tech Stack

- **Node.js** – Runtime
- **Express.js** – Web framework
- **Axios** – HTTP requests
- **cors** – Cross-Origin Resource Sharing
- **cobalt.tools API** – YouTube/Instagram fallback
- **tikwm.com API** – TikTok (no watermark)
- **fastdl.app API** – Instagram
- **getfvid.com** – Facebook (HD/SD)
