import { useState } from 'react'
import { Gift, Copy, Check, ChevronDown } from 'lucide-react'
import useAparecer from '../../hooks/useAparecer'
import './Regalo.css'

// ===== DATOS BANCARIOS (completar cuando los tengas) =====
const DATOS = [
  { etiqueta: 'Alias', valor: 'solcitovm.311' },
  { etiqueta: 'CBU', valor: '' },
]
const TITULAR = '' // opcional: nombre del titular de la cuenta

// Copia al portapapeles (con alternativa para navegadores viejos)
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto)
  } catch {
    const campo = document.createElement('textarea')
    campo.value = texto
    campo.style.position = 'fixed'
    campo.style.opacity = '0'
    document.body.appendChild(campo)
    campo.select()
    document.execCommand('copy')
    document.body.removeChild(campo)
  }
}

function FilaDato({ etiqueta, valor }) {
  const [copiado, setCopiado] = useState(false)
  const disponible = valor !== ''

  const copiar = async () => {
    await copiarTexto(valor)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="regalo__fila">
      <span className="regalo__etiqueta">{etiqueta}</span>
      <span className="regalo__valor">{disponible ? valor : 'A confirmar'}</span>
      <button
        type="button"
        className="boton regalo__copiar"
        onClick={copiar}
        disabled={!disponible}
        aria-label={`Copiar ${etiqueta}`}
      >
        {copiado ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
        {copiado ? '¡Copiado!' : `Copiar ${etiqueta}`}
      </button>
    </div>
  )
}

export default function Regalo() {
  const [ref, visible] = useAparecer()
  const [abierto, setAbierto] = useState(false)

  return (
    <section
      ref={ref}
      id="regalo"
      className={`seccion regalo aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Regalo</h2>

      <Gift className="icono-seccion regalo__icono" aria-hidden="true" />

      <p className="texto">
        ¡Traé tus ganas de pasarla bien!.. <br /> y si querés sumar un detalle, <br /> por acá te dejo la info
      </p>

      <button
        type="button"
        className="boton"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls="regalo-datos"
      >
        {abierto ? 'Ocultar datos' : 'Ver datos'}
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`regalo__flecha ${abierto ? 'regalo__flecha--abierta' : ''}`}
        />
      </button>

      {/* Panel que se despliega */}
      <div
        id="regalo-datos"
        className={`regalo__panel ${abierto ? 'regalo__panel--abierto' : ''}`}
      >
        <div className="regalo__panel-interior">
          <div className="regalo__tarjeta">
            {DATOS.map((dato) => (
              <FilaDato key={dato.etiqueta} {...dato} />
            ))}
            {TITULAR && <p className="regalo__titular">Titular: {TITULAR}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}