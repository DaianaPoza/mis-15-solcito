import useAparecer from '../../hooks/useAparecer'
import './DressCode.css'

// Íconos de línea fina, mismo estilo que los de lucide-react
function IconoVestido(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.2 2.2 9.9 6.3M14.8 2.2l-.7 4.1" />
      <path d="M9.9 6.3c1.3.9 2.9.9 4.2 0l-.5 3.7h-3.2z" />
      <path d="M10.4 10 6 21c4 1.4 8 1.4 12 0L13.6 10" />
    </svg>
  )
}

function IconoSaco(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8.5 3 4.2 4.8Q3 5.3 3 6.8L2.6 19H5l.6-8.5" />
      <path d="M15.5 3l4.3 1.8q1.2.5 1.2 2l.4 12.2H19l-.6-8.5" />
      <path d="M5.6 10.5V21h12.8V10.5" />
      <path d="M8.5 3 10 9.5l2 3.5 2-3.5L15.5 3" />
      <path d="M10.5 3h3L12 6.5z" />
      <path d="M12 13v8" />
      <circle cx="12" cy="15.5" r=".4" />
      <circle cx="12" cy="18.2" r=".4" />
      <path d="M7 15h2M15 15h2" />
    </svg>
  )
}

export default function DressCode() {
  const [ref, visible] = useAparecer()

  return (
    <section
      ref={ref}
      id="dress-code"
      className={`seccion dresscode aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Dress code</h2>

      <div className="dresscode__iconos" aria-hidden="true">
        <IconoVestido className="dresscode__icono" />
        <IconoSaco className="dresscode__icono" />
      </div>

      <p className="dresscode__tipo">Elegante Sport</p>

      <p className="texto dresscode__frase">¡Vestite para brillar!</p>

      <p className="dresscode__nota">
        Para esta noche, te pedimos <br /> dejar de lado el rosa y el verde
      </p>
    </section>
  )
}