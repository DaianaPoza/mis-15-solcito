import { FaSpotify } from 'react-icons/fa'
import useAparecer from '../../hooks/useAparecer'
import './Playlist.css'

// Pegá acá el link de la playlist colaborativa cuando lo tengas.
// Mientras esté vacío, el botón muestra "Muy pronto" y no se puede tocar.
const URL_PLAYLIST = 'https://open.spotify.com/playlist/10cr9vHBfe8srFYA4sCHSh?si=_AQacRBcTSCPLyd9gImrZg&utm_source=copy-link&pt=6ec0b30325ba3ff75a7b34a73bf3a04c&pi=PNFMoQYiSB6zP'

export default function Playlist() {
  const [ref, visible] = useAparecer()
  const hayLink = URL_PLAYLIST !== ''

  return (
    <section
      ref={ref}
      id="playlist"
      className={`seccion playlist aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Playlist</h2>

      <FaSpotify className="playlist__icono" aria-hidden="true" />

      <p className="playlist__pregunta">¿Qué canción <br /> no puede faltar?</p>

      <p className="texto">
        Sumala a nuestra playlist y ayudanos a armar la banda sonora de esta noche
      </p>

      {hayLink ? (
        <a
          className="boton"
          href={URL_PLAYLIST}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sumá tu canción
        </a>
      ) : (
        <span className="boton playlist__boton--pronto" aria-disabled="true">
          Muy pronto
        </span>
      )}
    </section>
  )
}