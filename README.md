<div align="center">

<!-- Optional: Add a banner image here -->
<img src="https://i.ibb.co.com/2YKN7nRM/IMG-20260214-174455-182.webp" alt="Universal Video Downloader Banner" width="100%" style="border-radius: 15px; margin-bottom: 20px;">

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
-[🚀 Quick Start (Local Setup)](#-quick-start-local-setup)
- [📡 API Documentation](#-api-documentation)
- [📦 Response Structure](#-response-structure)
- [☁️ Deployment Guide (Render)](#-deployment-guide-render)
- [🛠️ Tech Stack](#️-tech-stack)
-[⚠️ Important Notes](#️-important-notes)

---

## ✨ Features

- 🔗 **Unified Endpoint:** Send any supported URL to a single route.
- 🤖 **Smart Detection:** Automatically identifies the platform (YouTube, TikTok, FB, IG).
- 🚫 **Watermark-Free:** Extracts clean TikTok videos without the watermark.
- 📺 **Maximum Quality:** Prioritizes HD resolutions for YouTube and Facebook.
- ⚡ **Blazing Fast:** Minimal overhead, optimized for quick response times.
- 🌍 **CORS Ready:** Easily integrate with any frontend (React, Vue, Vanilla JS).

---

## 🎯 Supported Platforms

| Platform | Supported Content | Special Features |
| :--- | :--- | :--- |
| <img src="https://img.icons8.com/color/48/000000/youtube-play.png" width="20"/> **YouTube** | Videos & Shorts | Best available quality extraction |
| <img src="https://img.icons8.com/color/48/000000/tiktok.png" width="20"/> **TikTok** | Public Videos | **No Watermark** |
| <img src="https://img.icons8.com/color/48/000000/instagram-new.png" width="20"/> **Instagram** | Reels & Post Videos | Multi-resolution support |
| <img src="https://img.icons8.com/color/48/000000/facebook-new.png" width="20"/> **Facebook** | Public Watch Videos | **HD preferred** over SD |

---

## 🚀 Quick Start (Local Setup)

Get the API running on your local machine in seconds.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/social-video-downloader.git
   cd social-video-downloader

Install dependencies

code
Bash
download
content_copy
expand_less
npm install

Start the development server

code
Bash
download
content_copy
expand_less
npm start

Server will run on http://localhost:3000

📡 API Documentation
Base URL

If hosted locally: http://localhost:3000
If hosted on Render: https://your-api-name.onrender.com

1. Health Check

Check if the API is active.

Endpoint: GET /

Response:

code
JSON
download
content_copy
expand_less
{
  "status": "online",
  "version": "1.0.0",
  "usage": "/download?url=VIDEO_URL"
}
2. Download Video

The primary endpoint to fetch video data.

Endpoint: GET /download

Query Parameter:

url (string, required) - The full URL of the video.

💡 Example Requests:
code
Bash
download
content_copy
expand_less
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
📦 Response Structure
✅ Success Response (200 OK)
code
JSON
download
content_copy
expand_less
{
  "status": "success",
  "platform": "tiktok",
  "title": "Awesome TikTok Video",
  "thumbnail": "https://cdn.example.com/thumbnail.jpg",
  "download": "https://cdn.example.com/video-no-watermark.mp4"
}
❌ Error Responses (400 / 500)

Unsupported Platform:

code
JSON
download
content_copy
expand_less
{
  "status": "error",
  "message": "Unsupported platform. Supported: Instagram, TikTok, Facebook, YouTube"
}

Extraction Failure:

code
JSON
download
content_copy
expand_less
{
  "status": "error",
  "platform": "instagram",
  "message": "Instagram extraction failed: Video is private or URL is invalid."
}
☁️ Deployment Guide (Render)

Deploying this API to Render is completely free and takes 5 minutes.

Push this code to your GitHub repository.

Go to Render Dashboard → New + → Web Service.

Connect your GitHub repository.

Use the following settings:

Environment: Node

Build Command: npm install

Start Command: npm start

Click Create Web Service.

Render will auto-assign a URL (e.g., https://my-downloader.onrender.com).

🛠️ Tech Stack
Component	Technology	Purpose
Runtime	Node.js v18+	JavaScript execution environment
Framework	Express.js	API routing and server setup
HTTP Client	Axios	Making robust requests to external scrapers
Security	CORS	Cross-Origin Resource Sharing management

Note: This API utilizes third-party engines (like cobalt.tools, tikwm, fastdl, getfvid) for extraction.

⚠️ Important Notes

Cold Starts: If deployed on Render's free tier, the API goes to sleep after 15 minutes of inactivity. The first request after sleeping might take ~30 seconds.

Privacy Limits: The API can only extract publicly available videos. Private accounts or age-restricted videos will return an error.

Fair Use: This tool is for educational purposes. Always respect copyright laws and the Terms of Service of the respective platforms.

<div align="center">

👨‍💻 Developer

Maim Islam
Full Stack Developer & API Engineer

![alt text](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)


![alt text](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)

If you find this project useful, please consider giving it a ⭐ on GitHub!

Released under the MIT License.

</div>
