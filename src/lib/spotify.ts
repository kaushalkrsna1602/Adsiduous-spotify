// src/lib/spotify.ts
import axios from 'axios'

export const getUserProfile = async (accessToken: string) => {
  try {
    const res = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (err) {
    console.error('Error fetching profile:', err)
    return null
  }
}

export const getUserPlaylists = async (accessToken: string) => {
  try {
    const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.items
  } catch (err) {
    console.error('Error fetching playlists:', err)
    return []
  }
}
