// @ts-nocheck

'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import MusicPlayer from '../components/MusicPlayer'
import Header from '@/components/Header'
import AuthButtons from '@/components/AuthButtons'
import TrackList from '@/components/TrackList'

type Playlist = {
  id: string
  name: string
  images: { url: string }[]
}

type Track = {
  id: string
  name: string
  artists: { name: string }[]
  preview_url: string | null
}

export default function HomePage() {
  const { data: session, status } = useSession()

  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<{
    name: string
    artist: string
    previewUrl: string | null
  } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!session?.accessToken) return;

    // Fetch user's playlists from Spotify API
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data?.items) {
          setPlaylists(data.items);
        } else {
          setPlaylists([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch playlists', err);
        setPlaylists([]);
      });
  }, [session?.accessToken]);


  // Function to handle playlist click and fetch tracks
  const handlePlaylistClick = async (playlistId: string) => {
  setErrorMessage(null);
  setCurrentTrack(null);

  if (!session?.accessToken) return;

  try {
    // Fetch tracks for the selected playlist
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();

    if (!data.items) {
      setSelectedPlaylistTracks([]);
      setErrorMessage('No tracks found for this playlist.');
      return;
    }

    // Map the fetched tracks to our Track type
    setSelectedPlaylistTracks(
      data.items.map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists,
        preview_url: item.track.preview_url,
      }))
    );
  } catch (error) {
    setErrorMessage('Failed to fetch tracks.',);
  }
};


// Function to handle track click and set current track for playback
  const handleTrackClick = (track: Track) => {
    if (!track.preview_url) {
      setErrorMessage('No preview available for this track.')
      return
    }
    setErrorMessage(null)
    setCurrentTrack({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      previewUrl: track.preview_url,
    })
  }

  if (status === 'loading') {
    // Show loading spinner or text while session is loading
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-zinc-900">
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    // Show login button page if NOT logged in
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-gradient-to-b from-black via-zinc-900 to-zinc-800 px-4">
        <AuthButtons />
        <p className="text-lg font-medium">Please login to Spotify to see your playlists.</p>
      </div>
    )
  }

  // If logged in (status === 'authenticated'), show home page
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-500 mb-8 select-none tracking-wide">
          Your Spotify Playlists
        </h1>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {playlists.length === 0 && (
            <p className="text-white col-span-full text-center">No playlists found.</p>
          )}
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist.id)}
              className="cursor-pointer bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 flex flex-col items-center"
              title={playlist.name}
            >
              <img
                src={playlist.images[0]?.url}
                alt={playlist.name}
                className="w-full rounded-lg mb-3 aspect-square object-cover"
                loading="lazy"
              />
              <h3 className="text-white font-semibold truncate text-center text-lg">{playlist.name}</h3>
            </div>
          ))}
        </div>


        {/* Tracks List */}
        <TrackList
          tracks={selectedPlaylistTracks}
          currentTrack={currentTrack}
          onTrackClick={handleTrackClick}
          errorMessage={errorMessage}
        />

        {/* Music Player */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-green-600 shadow-lg">
          <MusicPlayer track={currentTrack} />
        </div>
      </main>
    </>
  )
}
