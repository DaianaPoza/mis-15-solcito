import { useEffect, useState } from 'react'
import useAparecer from '../../hooks/useAparecer'
import './CuentaRegresiva.css'

// 7 de noviembre de 2026, 21 hs, hora de Argentina (-03:00).
// Con la zona horaria fija, la cuenta es correcta aunque el invitado esté en otro país.
const FECHA_FIESTA = new Date('2026-11-07T21:00:00-03:00').getTime()

function calcularRestante() {
  const diferencia = Math.max(FECHA_FIESTA - Date.now(), 0)
  return {
    total: diferencia,
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  }
}

export default function CuentaRegresiva() {
  const [ref, visible] = useAparecer()
  const [restante, setRestante] = useState(calcularRestante)

  useEffect(() => {
    const intervalo = setInterval(() => setRestante(calcularRestante()), 1000)
    return () => clearInterval(intervalo)
  }, [])

 const unidades = [
  { valor: restante.dias, etiqueta: restante.dias === 1 ? 'Día' : 'Días', destacado: true },
  { valor: restante.horas, etiqueta: 'Horas' },
  { valor: restante.minutos, etiqueta: 'Min' },
  { valor: restante.segundos, etiqueta: 'Seg' },
]

  const llego = restante.total === 0

  return (
    <section
      ref={ref}
      id="cuenta-regresiva"
      className={`seccion cuenta aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Cuenta regresiva</h2>

      {llego ? (
        <p className="texto cuenta__llego">¡Llegó el gran día!</p>
      ) : (
        <>
          <p className="texto">¡Ya empieza la cuenta! <br />¿Estás listo para festejar?</p>

          <div className="cuenta__grilla" role="timer">

           {unidades.map(({ valor, etiqueta, destacado }) => (
  <div
    className={`cuenta__caja ${destacado ? 'cuenta__caja--destacada' : ''}`}
    key={etiqueta}
  >
    <span className="cuenta__numero">{valor}</span>
    <span className="cuenta__etiqueta">{etiqueta}</span>
  </div>
))}
          </div>
        </>
      )}
    </section>
  )
}