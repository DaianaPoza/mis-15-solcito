import { MapPin } from 'lucide-react'
import useAparecer from '../../hooks/useAparecer'
import './Lugar.css'

// ===== DATOS DEL LUGAR (se editan solo acá) =====
const NOMBRE = 'Predio S.O.E.A'
const DIRECCION = 'Ruta 229 km 17'

// Lo que se busca en Google Maps al tocar "Cómo llegar".
// Si no lleva al lugar correcto, reemplazalo por las coordenadas exactas,
// por ejemplo: '-38.7183,-62.2663'
const BUSQUEDA_MAPA = 'Predio S.O.E.A, Ruta 229 km 17'

const URL_COMO_LLEGAR = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSQUEDA_MAPA)}`

export default function Lugar() {
  const [ref, visible] = useAparecer()

  return (
    <section
      ref={ref}
      id="lugar"
      className={`seccion lugar aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Lugar</h2>

      <p className="lugar__nombre">{NOMBRE}</p>

      <p className="texto lugar__direccion">{DIRECCION}</p>

      <a
        className="boton"
        href={URL_COMO_LLEGAR}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapPin size={18} strokeWidth={1.5} />
        Cómo llegar
      </a>
    </section>
  )
}