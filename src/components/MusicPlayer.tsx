'use client'

import { useState, useEffect, useRef } from 'react'

type MusicPlayerProps = {
  track: {
    name: string
    artist: string
    previewUrl: string | null
  } | null
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [track])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  if (!track) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 p-4 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">{track.name}</p>
          <p className="text-gray-400 text-sm">{track.artist}</p>
        </div>

        {track.previewUrl ? (
          <>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <audio ref={audioRef} src={track.previewUrl} />
          </>
        ) : (
          <p className="text-gray-400">No preview available</p>
        )}
      </div>
    </div>
  )
}
