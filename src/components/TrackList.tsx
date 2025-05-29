'use client'

type Artist = { name: string }

type Track = {
  id: string
  name: string
  artists: Artist[]
  preview_url: string | null
}

type CurrentTrack = {
  name: string
  artist: string
  previewUrl: string | null
} | null

interface TrackListProps {
  tracks: Track[]
  currentTrack: CurrentTrack
  onTrackClick: (track: Track) => void
  errorMessage: string | null
}

export default function TrackList({
  tracks,
  currentTrack,
  onTrackClick,
  errorMessage,
}: TrackListProps) {
  if (!tracks.length) return null

  return (
    <div className="mt-10">
      <h2 className="text-white text-2xl mb-4">Tracks</h2>
      <div className="bg-zinc-800 rounded-lg overflow-hidden">
        <ul className="divide-y divide-zinc-700">
          {tracks.map((track, index) => {
            const uniqueKey = `${track.id}-${index}`
            const isPlaying =
              currentTrack?.name === track.name &&
              currentTrack?.artist === track.artists.map((a) => a.name).join(', ')

            return (
              <li
                key={uniqueKey }
                onClick={() => onTrackClick(track)}
                className={`px-4 py-3 transition-all duration-150 ${
                  isPlaying ? 'bg-zinc-700 ring-2 ring-green-500' : ''
                } hover:bg-zinc-700 text-white cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400 w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="text-base font-medium truncate">{track.name}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {track.artists.map((a) => a.name).join(', ')}
                    </p>
                  </div>
                  {!track.preview_url && (
                    <span className="text-xs text-red-500">(No Preview)</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {errorMessage && (
        <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
      )}
    </div>
  )
}
