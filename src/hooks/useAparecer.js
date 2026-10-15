import { useEffect, useRef, useState } from 'react'

// Devuelve una ref para la sección y "visible" = true
// la primera vez que la sección entra en pantalla.
export default function useAparecer(umbral = 0.3) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          observador.disconnect() // aparece una sola vez
        }
      },
      { threshold: umbral }
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [umbral])

  return [ref, visible]
}