import { Camera } from 'lucide-react'
import useAparecer from '../../hooks/useAparecer'
import './Album.css'

// Pegá acá el link del álbum compartido de Google Fotos (con "Colaborar" activado).
// Mientras esté vacío, el botón muestra "Muy pronto" y no se puede tocar.
const URL_ALBUM = 'https://photos.app.goo.gl/j8Az6dMAgr3sVTMQ9'

export default function Album() {
  const [ref, visible] = useAparecer()
  const hayLink = URL_ALBUM !== ''

  return (
    <section
      ref={ref}
      id="album"
      className={`seccion album aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Álbum compartido</h2>

      <Camera className="icono-seccion album__icono" aria-hidden="true" />

      <p className="album__frase">Cada foto guarda un momento</p>

      <p className="texto">
        Compartí las tuyas y armemos juntos el álbum de esta noche.
      </p>

      {hayLink ? (
        <a
          className="boton"
          href={URL_ALBUM}
          target="_blank"
          rel="noopener noreferrer"
        >
          Subí tus fotos
        </a>
      ) : (
        <span className="boton album__boton--pronto" aria-disabled="true">
          Muy pronto
        </span>
      )}

      <p className="album__nota">Tocá el botón, unite al álbum y sumá tus fotos.</p>
    </section>
  )
}