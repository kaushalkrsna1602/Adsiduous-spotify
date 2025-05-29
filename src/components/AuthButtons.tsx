'use client'

import { signIn, signOut, useSession } from 'next-auth/react'


export default function AuthButtons() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <>
          <span>Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </>
      ) : (
        <button onClick={() => signIn('spotify')} className="px-4 py-2 bg-green-500 text-white rounded">Login with Spotify</button>
      )}
    </div>
  )
}
