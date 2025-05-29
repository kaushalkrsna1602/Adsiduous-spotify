// src/components/PlaylistSkeleton.tsx

export default function PlaylistSkeleton() {
  return (
    <div className="animate-pulse bg-zinc-900 p-4 rounded-lg">
      <div className="w-full h-40 bg-zinc-800 rounded-md mb-3"></div>
      <div className="h-4 bg-zinc-700 w-3/4 rounded mb-2"></div>
      <div className="h-3 bg-zinc-700 w-1/2 rounded"></div>
    </div>
  )
}
