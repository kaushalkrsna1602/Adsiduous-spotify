import './globals.css'
// import { Inter } from 'next/font/google'
import Provider from '@/components/SessionProvider'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Simplified Spotify Homepage Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-zinc-950 via-black to-zinc-900 min-h-screen">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
