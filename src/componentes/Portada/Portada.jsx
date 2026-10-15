import { useEffect, useState } from 'react'

import './Portada.css'

export default function Portada({ onEntrar }) {
  const [saliendo, setSaliendo] = useState(false)
  const [cerrada, setCerrada] = useState(false)

  // Bloquea el scroll de la página mientras la portada está visible
  useEffect(() => {
    document.body.style.overflow = cerrada ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [cerrada])

  const entrar = () => {
    setSaliendo(true)
    onEntrar?.() // acá después arrancamos la música (el clic habilita el audio)
  }

  // Cuando termina el fundido, la portada se quita del DOM
  const alTerminarTransicion = (e) => {
    if (saliendo && e.target === e.currentTarget) setCerrada(true)
  }

  if (cerrada) return null

  return (
    <section
      className={`portada ${saliendo ? 'portada--saliendo' : ''}`}
      onTransitionEnd={alTerminarTransicion}
      aria-label="Portada de la invitación"
    >
      <div className="portada__contenido">
        <p className="portada__edad">
          <span className="portada__mis">Mis</span>
          <span className="portada__numero">15</span>
          <span className="portada__anios">años</span>
        </p>

        <h1 className="titulo-script portada__nombre">Solcito</h1>

       

        <p className="portada__frase">
          ¡Tenemos mucho <br /> por celebrar!
        </p>

        <button type="button" className="boton portada__boton" onClick={entrar}>
          Entrar
        </button>
      </div>
    </section>
  )
}