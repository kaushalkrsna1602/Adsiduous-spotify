// src/components/PlaylistCard.tsx

type PlaylistCardProps = {
  image: string
  name: string
  totalTracks: number
}

export default function PlaylistCard({ image, name, totalTracks }: PlaylistCardProps) {
  return (
    <div className="bg-zinc-900 hover:bg-zinc-800 transition-colors p-4 rounded-lg shadow-sm cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-white text-base sm:text-lg font-semibold truncate">{name}</h3>
      <p className="text-sm text-gray-400">{totalTracks} tracks</p>
    </div>
  )
}
