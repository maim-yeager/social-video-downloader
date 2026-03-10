<div align="center">

<img src="https://i.ibb.co.com/2YKN7nRM/IMG-20260214-174455-182.webp" alt="Universal Video Downloader Banner" width="100%" style="border-radius: 15px; margin-bottom: 20px;"> -->

# 🚀 Universal Social Media Video Downloader API

**A robust, lightweight, and unified REST API built with Node.js & Express.js**
*Download videos from YouTube, TikTok, Instagram, and Facebook using a single endpoint.*

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Render](https://img.shields.io/badge/Hosted_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![License](https://img.shields.io/badge/License-MIT-00599C?style=for-the-badge)](LICENSE)

*Developed & maintained by **[Maim Islam](#-developer)***

---

</div>

## 📑 Table of Contents

- [✨ Features](#-features)
- [🎯 Supported Platforms](#-supported-platforms)
- [🚀 Quick Start (Local Setup)](#-quick-start-local-setup)
- [📡 API Documentation](#-api-documentation)
- [📦 Response Structure](#-response-structure)
- [☁️ Deployment Guide (Render)](#️-deployment-guide-render)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚠️ Important Notes](#️-important-notes)
- [👨‍💻 Developer](#-developer)

---

## ✨ Features

- 🔗 **Unified Endpoint:** Send any supported URL to a single route.
- 🤖 **Smart Detection:** Automatically identifies the platform (YouTube, TikTok, Facebook, Instagram).
- 🚫 **Watermark-Free:** Extracts clean TikTok videos without the watermark.
- 📺 **Maximum Quality:** Prioritizes HD resolutions for YouTube and Facebook.
- ⚡ **Blazing Fast:** Minimal overhead, optimized for quick response times.
- 🌍 **CORS Ready:** Easily integrate with any frontend (React, Vue, Vanilla JS).

---

## 🎯 Supported Platforms

| Platform | Supported Content | Special Features |
| :--- | :--- | :--- |
| <img src="https://img.icons8.com/color/48/youtube-play.png" width="20"/> **YouTube** | Videos & Shorts | Best available quality extraction |
| <img src="https://img.icons8.com/color/48/tiktok.png" width="20"/> **TikTok** | Public Videos | **No Watermark** |
| <img src="https://img.icons8.com/color/48/instagram-new.png" width="20"/> **Instagram** | Reels & Post Videos | Multi-resolution support |
| <img src="https://img.icons8.com/color/48/facebook-new.png" width="20"/> **Facebook** | Public Watch Videos | **HD preferred** over SD |

---

## 🚀 Quick Start (Local Setup)

Get the API running on your local machine in seconds.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Installation Steps

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/social-video-downloader.git
cd social-video-downloader
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm start
```

> Server will run on **http://localhost:3000**

---

## 📡 API Documentation

### Base URL

| Environment | URL |
| :--- | :--- |
| Local | `http://localhost:3000` |
| Production | `https://your-api-name.onrender.com` |

---

### 1. Health Check

Check if the API is active.

```
GET /
```

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

### 2. Download Video

The primary endpoint to fetch video data.

```
GET /download?url=VIDEO_URL
```

**Query Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `url` | `string` | ✅ Yes | The full URL of the video |

**Example Requests:**

```bash
# YouTube
GET /download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ

# YouTube Shorts
GET /download?url=https://www.youtube.com/shorts/123xyz

# TikTok
GET /download?url=https://www.tiktok.com/@username/video/1234567890

# Instagram
GET /download?url=https://www.instagram.com/reel/ABC123xyz/

# Facebook
GET /download?url=https://www.facebook.com/watch/?v=987654321
```

---

## 📦 Response Structure

### ✅ Success Response `200 OK`

```json
{
  "status": "success",
  "platform": "tiktok",
  "title": "Awesome TikTok Video",
  "thumbnail": "https://cdn.example.com/thumbnail.jpg",
  "download": "https://cdn.example.com/video-no-watermark.mp4"
}
```

### ❌ Error Responses `400 / 500`

**Missing URL Parameter:**

```json
{
  "status": "error",
  "message": "Missing 'url' query parameter. Usage: /download?url=VIDEO_URL"
}
```

**Invalid URL Format:**

```json
{
  "status": "error",
  "message": "Invalid URL format"
}
```

**Unsupported Platform:**

```json
{
  "status": "error",
  "message": "Unsupported platform. Supported: Instagram, TikTok, Facebook, YouTube"
}
```

**Extraction Failure:**

```json
{
  "status": "error",
  "platform": "instagram",
  "message": "Instagram extraction failed: Video is private or URL is invalid."
}
```

---

## ☁️ Deployment Guide (Render)

Deploying this API to Render is **completely free** and takes under 5 minutes.

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial release"
git remote add origin https://github.com/YOUR_USERNAME/social-video-downloader.git
git branch -M main
git push -u origin main
```

### Step 2 — Create a Render Account

Go to 👉 **https://render.com** and sign up using your GitHub account.

### Step 3 — Create a New Web Service

1. Dashboard → Click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub repository

### Step 4 — Configure Service Settings

| Setting | Value |
| :--- | :--- |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 5 — Deploy

Click **"Create Web Service"**. Render will build and deploy automatically.

> ⏱️ First deployment takes **2–4 minutes**. Once live, your API is available at:
> ```
> https://your-api-name.onrender.com/download?url=VIDEO_URL
> ```

### 🔄 Auto-Deploy on Updates

Every `git push` to the `main` branch triggers an automatic redeployment.

```bash
git add .
git commit -m "fix: update handler"
git push
```

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js v18+ | JavaScript execution environment |
| **Framework** | Express.js | API routing and server setup |
| **HTTP Client** | Axios | Making requests to external scrapers |
| **Security** | CORS | Cross-Origin Resource Sharing management |
| **YouTube Engine** | cobalt.tools API | Video extraction & fallback |
| **TikTok Engine** | tikwm.com API | No-watermark video extraction |
| **Instagram Engine** | fastdl.app API | Reels & post video extraction |
| **Facebook Engine** | getfvid.com | HD/SD video extraction |

---

## ⚠️ Important Notes

- **Cold Starts:** On Render's free tier, the service sleeps after 15 minutes of inactivity. The first request after sleeping may take ~30 seconds to respond.
- **Public Videos Only:** The API can only extract publicly available videos. Private accounts or age-restricted content will return an error.
- **Rate Limits:** This API relies on free third-party services which may have usage limits. For production, consider a paid tier.
- **Fair Use:** This tool is intended for educational and personal use. Always respect copyright laws and the Terms of Service of each platform.

---

## 👨‍💻 Developer

<div align="center">

<br>

### Maim Islam

*Full Stack Developer & API Engineer*

<br>

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)

<br>

*If you find this project useful, please consider giving it a ⭐ on GitHub!*

<br>

Released under the **MIT License**.

<br>

---

*Made with ❤️ by **Maim Islam***

</div>
