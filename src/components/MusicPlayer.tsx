'use client'

import { useState, useEffect, useRef } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'

type MusicPlayerProps = {
  track: {
    name: string
    artist: string
    previewUrl: string | null
  } | null
}

export default function MusicPlayer({ track }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Reset player when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setProgress(0)
    }
  }, [track])

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Track progress
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * audio.duration
    audio.currentTime = newTime
    setProgress(parseFloat(e.target.value))
  }

  if (!track) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 p-4 z-50 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white">
          <p className="font-semibold">{track.name}</p>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>

        {track.previewUrl ? (
          <>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={togglePlay}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full md:w-64 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Volume2 className="text-white" size={20} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 md:w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <audio ref={audioRef} src={track.previewUrl} preload="metadata" />
          </>
        ) : (
          <p className="text-gray-400">No preview available</p>
        )}
      </div>
    </div>
  )
}
