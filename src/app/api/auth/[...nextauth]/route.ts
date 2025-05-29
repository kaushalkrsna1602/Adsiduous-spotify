import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-private",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
].join(",");



const authOptions: NextAuthOptions = {
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
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },
    // This callback is called whenever a session is checked
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
