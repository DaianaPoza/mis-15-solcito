import useAparecer from '../../hooks/useAparecer'
import './Fecha.css'

export default function Fecha() {
  const [ref, visible] = useAparecer()

  return (
    <section
      ref={ref}
      id="fecha"
      className={`seccion fecha aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      {/* Bloque 1: Fecha */}
      <div className="fecha__bloque">
        <h2 className="titulo-seccion">Fecha</h2>
        <time className="fecha__valor" dateTime="2026-11-07">
          7 · 11 · 2026
        </time>
      </div>

      {/* Bloque 2: Horario */}
      <div className="fecha__bloque">
        <h2 className="titulo-seccion">Horario</h2>
        <time className="fecha__valor" dateTime="21:00">
          21:00 hs
        </time>
      </div>
    </section>
  )
}