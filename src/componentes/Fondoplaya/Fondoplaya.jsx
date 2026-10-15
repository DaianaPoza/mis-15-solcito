import { useEffect, useState } from 'react'
import './FondoPlaya.css'

// Tres tramos: 1 = mar y sol · 2 = arena · 3 = orilla con espuma
const TRAMOS = [1, 2, 3]

export default function FondoPlaya() {
  const [tramoActivo, setTramoActivo] = useState(1)

  useEffect(() => {
    // Busca los grupos de secciones marcados con data-tramo en App.jsx
    const grupos = document.querySelectorAll('[data-tramo]')

    // Cambia el fondo cuando un grupo cruza la mitad de la pantalla
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setTramoActivo(Number(entrada.target.dataset.tramo))
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    grupos.forEach((grupo) => observador.observe(grupo))
    return () => observador.disconnect()
  }, [])

  return (
    <div className="fondo-playa" aria-hidden="true">
      {TRAMOS.map((tramo) => (
        <div
          key={tramo}
          className={`fondo-playa__capa fondo-playa__capa--${tramo} ${
            tramo === tramoActivo ? 'fondo-playa__capa--activa' : ''
          }`}
        />
      ))}
    </div>
  )
}