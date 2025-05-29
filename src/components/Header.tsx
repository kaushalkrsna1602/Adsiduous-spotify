'use client'

import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800 p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">Spotify</h1>

      {user && (
        <div className="flex items-center gap-4">
          <p className="text-white hidden sm:block">{user.name}</p>
          {user.image && (
            <img
              src={user.image}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <button
            onClick={() => signOut()}
            className="text-sm text-white bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
