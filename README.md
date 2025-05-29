# Adsiduous Spotify Clone

A simplified Spotify homepage clone built with Next.js (App Router), TypeScript, NextAuth.js (Spotify OAuth), and Tailwind CSS.  
Fetches and displays user playlists from the Spotify API with a music player for track previews.

---

## 🚀 Live Demo

🔗 [https://adsiduous-spotify.vercel.app/](https://adsiduous-spotify.vercel.app/)

## Features

- Spotify OAuth authentication via NextAuth.js
- Display user's Spotify playlists
- Show tracks of selected playlist
- Play 30-second preview of selected track
- Responsive UI with Tailwind CSS
- Error handling and loading states

---

## Tech Stack

- Next.js 15
- TypeScript
- NextAuth.js
- Spotify Web API
- Tailwind CSS
- React Hooks (useState, useEffect)
- Vercel (for deployment)

---

## Setup and Installation

### 1. Create Spotify Developer Application

- Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Create a new app and copy your **Client ID** and **Client Secret**.
- Add the following Redirect URI for your development environment and production:

http://localhost:3000/api/auth/callback/spotify


### 2. Environment Variables

Create a `.env.local` file in the root of your project with:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret


npm install next react react-dom next-auth tailwindcss
npm install -D typescript @types/react @types/node

  src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/route.ts    # NextAuth route handler
│   ├── page.tsx                         # Main home page
│
├── components/
│   ├── Header.tsx
│   ├── AuthButtons.tsx
│   ├── MusicPlayer.tsx
│   ├── TrackList.tsx
│   └── PlaylistCard.tsx
│
.env.local
next.config.js
package.json


Common Issues
Invalid redirect URI error: Make sure the redirect URI is added exactly in Spotify Dashboard and matches deployed URL.

TypeScript errors for accessToken: Extend Session type or use type assertion carefully.


## 🧪 Test Login (Development Mode)

As the app is currently in **Spotify Developer Mode**, only approved users can test it.

### ✅ Use this test Spotify account:

- **Email**: `natojes709@pricegh.com`
- **Password**: `Spotify@123`

