import { ChevronDown } from 'lucide-react'
import './Hero.css'

export default function Hero({ activo }) {
  return (
    <section className={`seccion hero ${activo ? 'hero--activo' : ''}`} id="hero">
      <p className="hero__edad">Mis 15 años</p>

      <h2 className="titulo-script hero__nombre">Solcito</h2>

      <p className="texto hero__frase">
        Te invito a celebrar conmigo este momento tan especial.
      </p>

      {/* Indicador para deslizar: lleva a la sección siguiente */}
    <a href="#fecha" className="hero__deslizar">
  <span className="hero__circulo">
    <ChevronDown aria-hidden="true" />
  </span>
  <span className="hero__deslizar-texto">Deslizá</span>
</a>
    </section>
  )
}