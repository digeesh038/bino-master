# Bino Dynamic Page Engine 🚀

A professional, high-performance monorepo for generating on-demand web pages via a simple JSON API.

## Project Structure
- **`/frontend`**: Next.js 15 application with premium components (Framer Motion + Tailwind).
- **`/backend`**: Express server with MongoDB integration for persistent page storage.

## Core Features
1. **POST /api/pages**: Create new routes on-the-fly.
2. **Dynamic Rendering**: Pages are immediately available at `/{slug}`.
3. **5 Reusable Components**: 
   - `TextSection`: Titles, subtitles, and body text with gradients.
   - `ImageBlock`: High-quality images with zoom/fade animations.
   - `Card`: Interactive cards with glassmorphism and tilt effects.
   - `StatsBox`: Animated statistics with icons.
   - `CTA`: Powerful call-to-action sections.

## How to use

### 1. Installation
```bash
npm run install:all
```

### 2. Development
```bash
npm run dev
```
Wait for both servers to start:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 3. Environment Variables
Created in `backend/.env`:
- `PORT`: 5000 (default)
- `MONGODB_URI`: Connection string to your MongoDB.
- `BACKEND_URL`: (Frontend) Set this to your backend API URL if not localhost.

### 3. Create a Page (Sample Curl)
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "future-launch",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "Welcome to the Future",
          "subtitle": "Bino Engine v1.0",
          "gradient": "from-blue-600 to-purple-600"
        }
      },
      {
        "type": "ImageBlock",
        "props": {
          "src": "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
          "alt": "Space technology",
          "aspect": "wide"
        }
      }
    ]
  }'
```

After running the above, visit `http://localhost:3000/future-launch`.

## Generated Pages
- [Home](http://localhost:3000/)
- [Problem Statement](http://localhost:3000/problem)
- [API Documentation & Playground](http://localhost:3000/api)
- [Demo Page](http://localhost:3000/demo-page) (Auto-seeded)
- [Feature Showcase](http://localhost:3000/test3) (Auto-seeded)

## Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub.
2. Link your repository to Vercel.
3. Set Environment Variable: `BACKEND_URL` to your deployed backend URL.

### Backend (Render / Railway)
1. Create a Web Service.
2. Set Environment Variable: `MONGODB_URI` to your MongoDB Connection String.
3. The backend will automatically seed the demo pages on first connection.

## Tech Stack
- **Frontend**: Next.js 15, Framer Motion, Tailwind CSS, TypeScript.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Aesthetics**: Glassmorphism, Modern Gradients, "Pro Gamer" feel.
