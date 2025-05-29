import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { NextAuthOptions } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

const scopes = [
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'playlist-read-private',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing'
].join(',')

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expires_at = account.expires_at
      }
      return token
    },
    async session({ session, token }) {
      // You can cast session as needed
      (session as any).accessToken = token.accessToken
      return session
    },
  },
}

// App Router syntax: create handler for both GET and POST
const handler = NextAuth(authOptions)
export const GET = handler
export const POST = handler
