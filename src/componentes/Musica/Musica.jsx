import { useEffect, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import cancion from '../../assets/music/cancion.mp3'
import './Musica.css'

export default function Musica({ audioRef, visible }) {
  const [sonando, setSonando] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const alReproducir = () => setSonando(true)
    const alPausar = () => setSonando(false)

    // Si la persona cambia de app o de pestaña, la música se pausa
    // y vuelve a sonar cuando regresa (solo si estaba sonando)
    let estabaSonando = false
    const alCambiarVisibilidad = () => {
      if (document.hidden) {
        estabaSonando = !audio.paused
        audio.pause()
      } else if (estabaSonando) {
        audio.play().catch(() => {})
      }
    }

    audio.addEventListener('play', alReproducir)
    audio.addEventListener('pause', alPausar)
    document.addEventListener('visibilitychange', alCambiarVisibilidad)

    return () => {
      audio.removeEventListener('play', alReproducir)
      audio.removeEventListener('pause', alPausar)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [audioRef])

  const alternar = () => {
    const audio = audioRef.current
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <>
      <audio ref={audioRef} src={cancion} loop preload="auto" />

      {visible && (
        <button
          type="button"
          className={`musica ${sonando ? 'musica--sonando' : ''}`}
          onClick={alternar}
          aria-label={sonando ? 'Pausar música' : 'Reproducir música'}
        >
          {sonando ? <Pause /> : <Music />}
        </button>
      )}
    </>
  )
}