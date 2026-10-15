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
      <h2 className="titulo-seccion">Fecha y Horario</h2>

      <time className="fecha__dia" dateTime="2026-11-07">
        7 · 11 · 2026
      </time>

      <time className="fecha__hora" dateTime="21:00">
        21 hs
      </time>
    </section>
  )
}