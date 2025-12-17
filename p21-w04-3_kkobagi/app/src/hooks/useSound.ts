import { useRef, useEffect } from 'react'

const useSound = (src: string) => {
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audio.current = new Audio(src)
    return () => {
      if (audio.current) {
        audio.current.pause()
        audio.current = null
      }
    }
  }, [src])

  const play = () => {
    if (audio.current) {
      audio.current.currentTime = 0 // Reset to start
      audio.current.play().catch((e) => console.error('Error playing sound:', e))
    }
  }

  const stop = () => {
    if (audio.current) {
      audio.current.pause()
      audio.current.currentTime = 0
    }
  }

  return { play, stop }
}

export default useSound
