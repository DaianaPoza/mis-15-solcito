import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import useAparecer from '../../hooks/useAparecer'
import './Confirmacion.css'

// ===== CONFIGURACIÓN =====
// URL de la aplicación web de Google Apps Script (ver instrucciones)
const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbzzEdhsvNQg3PQgFlCPZtDiXay_BchnAQCiFV9im7BRFo9sU6k0HOsEA1W_ra9UV3F-Iw/exec'
const FECHA_LIMITE = 'lunes 26 de octubre'
const MAX_INVITADOS = 10

const RESTRICCIONES = [
  { id: 'ninguna', texto: 'Ninguna' },
  { id: 'hipertension', texto: 'Hipertensión arterial' },
  { id: 'celiaquia', texto: 'Celiaquía' },
  { id: 'vegetariano', texto: 'Vegetariano/a' },
  { id: 'vegano', texto: 'Vegano/a' },
  { id: 'alergia', texto: 'Alergia' },
  { id: 'otra', texto: 'Otra' },
]

const personaVacia = () => ({
  nombre: '',
  apellido: '',
  restricciones: ['ninguna'],
  alergia: '',
  otra: '',
})

export default function Confirmacion() {
  const [ref, visible] = useAparecer(0.15)
  const [asistencia, setAsistencia] = useState(null) // 'si' | 'no'
  const [personas, setPersonas] = useState([personaVacia()])
  const [mensaje, setMensaje] = useState('')
  const [estado, setEstado] = useState('inicial') // inicial | enviando | listo | error
  const [error, setError] = useState('')

  // --- Cantidad de invitados ---
  const cambiarCantidad = (nueva) => {
    if (nueva < 1 || nueva > MAX_INVITADOS) return
    setPersonas((actuales) =>
      nueva > actuales.length
        ? [...actuales, ...Array.from({ length: nueva - actuales.length }, personaVacia)]
        : actuales.slice(0, nueva)
    )
  }

  // --- Editar datos de una persona ---
  const actualizar = (indice, campo, valor) => {
    setPersonas((actuales) =>
      actuales.map((p, i) => (i === indice ? { ...p, [campo]: valor } : p))
    )
  }

  // "Ninguna" es excluyente: si se elige, se borran las demás (y al revés)
  const alternarRestriccion = (indice, id) => {
    setPersonas((actuales) =>
      actuales.map((p, i) => {
        if (i !== indice) return p
        if (id === 'ninguna') return { ...p, restricciones: ['ninguna'] }
        let lista = p.restricciones.filter((r) => r !== 'ninguna')
        lista = lista.includes(id) ? lista.filter((r) => r !== id) : [...lista, id]
        return { ...p, restricciones: lista.length ? lista : ['ninguna'] }
      })
    )
  }

  // --- Validación ---
  const validar = () => {
    if (!asistencia) return 'Contanos si vas a poder venir.'
    const lista = asistencia === 'si' ? personas : personas.slice(0, 1)
    for (const [i, p] of lista.entries()) {
      const quien = lista.length > 1 ? ` del invitado ${i + 1}` : ''
      if (!p.nombre.trim() || !p.apellido.trim()) return `Completá nombre y apellido${quien}.`
      if (asistencia === 'si') {
        if (p.restricciones.includes('alergia') && !p.alergia.trim())
          return `Indicá a qué es alérgico/a${quien}.`
        if (p.restricciones.includes('otra') && !p.otra.trim())
          return `Contanos cuál es la otra restricción${quien}.`
      }
    }
    return ''
  }

  // --- Envío a Google Sheets ---
  const enviar = async (e) => {
    e.preventDefault()
    const problema = validar()
    if (problema) {
      setError(problema)
      return
    }
    setError('')
    setEstado('enviando')

    const lista = asistencia === 'si' ? personas : personas.slice(0, 1)
    const datos = {
      tipo: 'confirmacion',
      asistencia: asistencia === 'si' ? 'Sí' : 'No',
      mensaje: mensaje.trim(),
      personas: lista.map((p) => ({
        nombre: p.nombre.trim(),
        apellido: p.apellido.trim(),
        restricciones:
          asistencia === 'si'
            ? p.restricciones
                .map((id) => RESTRICCIONES.find((r) => r.id === id).texto)
                .join(', ')
            : '',
        alergia: p.restricciones.includes('alergia') ? p.alergia.trim() : '',
        otra: p.restricciones.includes('otra') ? p.otra.trim() : '',
      })),
    }

    try {
      const respuesta = await fetch(URL_SCRIPT, {
        method: 'POST',
        // text/plain evita el bloqueo de CORS con Apps Script
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(datos),
      })
      const resultado = await respuesta.json()
      if (!resultado.ok) throw new Error(resultado.error)
      setEstado('listo')
    } catch {
      setEstado('error')
      setError('No pudimos enviar tu confirmación. Revisá tu conexión e intentá de nuevo.')
    }
  }

  return (
    <section
      ref={ref}
      id="confirmacion"
      className={`seccion confirmacion aparecer ${visible ? 'aparecer--visible' : ''}`}
    >
      <h2 className="titulo-seccion">Confirmá tu asistencia</h2>

      <p className="texto">
        ¡Tu presencia es lo que hace <br /> esta noche especial! 
      </p>

      {estado === 'listo' ? (
        <div className="confirmacion__gracias">
          <p className="confirmacion__gracias-titulo">¡Gracias!</p>
          <p className="texto">
            {asistencia === 'si'
              ? 'Tu confirmación ya llegó. ¡Nos vemos en la fiesta!'
              : 'Gracias por avisarme. ¡Te voy a extrañar!'}
          </p>
        </div>
      ) : (
        <form className="confirmacion__formulario" onSubmit={enviar} noValidate>
          {/* ¿Asistís? */}
          <fieldset className="confirmacion__grupo">
            <legend className="confirmacion__pregunta">¿Vas a poder venir?</legend>
            <div className="confirmacion__opciones">
              <button
                type="button"
                className={`confirmacion__opcion ${asistencia === 'si' ? 'confirmacion__opcion--activa' : ''}`}
                onClick={() => setAsistencia('si')}
                aria-pressed={asistencia === 'si'}
              >
                ¡Sí, voy!
              </button>
              <button
                type="button"
                className={`confirmacion__opcion ${asistencia === 'no' ? 'confirmacion__opcion--activa' : ''}`}
                onClick={() => setAsistencia('no')}
                aria-pressed={asistencia === 'no'}
              >
                No puedo ir
              </button>
            </div>
          </fieldset>

          {/* Cantidad de invitados (solo si asiste) */}
          {asistencia === 'si' && (
            <fieldset className="confirmacion__grupo">
              <legend className="confirmacion__pregunta">Cantidad de invitados</legend>
              <p className="confirmacion__ayuda">
                Si confirmás por tu grupo familiar, indicá cuántos son en total.
              </p>
              <div className="confirmacion__contador">
                <button
                  type="button"
                  onClick={() => cambiarCantidad(personas.length - 1)}
                  disabled={personas.length === 1}
                  aria-label="Restar un invitado"
                >
                  <Minus size={18} strokeWidth={1.5} />
                </button>
                <span aria-live="polite">{personas.length}</span>
                <button
                  type="button"
                  onClick={() => cambiarCantidad(personas.length + 1)}
                  disabled={personas.length === MAX_INVITADOS}
                  aria-label="Sumar un invitado"
                >
                  <Plus size={18} strokeWidth={1.5} />
                </button>
              </div>
            </fieldset>
          )}

          {/* Datos de cada persona */}
          {asistencia &&
            (asistencia === 'si' ? personas : personas.slice(0, 1)).map((p, i) => (
              <fieldset className="confirmacion__persona" key={i}>
                {asistencia === 'si' && personas.length > 1 && (
                  <legend className="confirmacion__persona-titulo">Invitado {i + 1}</legend>
                )}

                <div className="confirmacion__fila">
                  <input
                    className="campo"
                    type="text"
                    placeholder="Nombre"
                    autoComplete={i === 0 ? 'given-name' : 'off'}
                    value={p.nombre}
                    onChange={(e) => actualizar(i, 'nombre', e.target.value)}
                  />
                  <input
                    className="campo"
                    type="text"
                    placeholder="Apellido"
                    autoComplete={i === 0 ? 'family-name' : 'off'}
                    value={p.apellido}
                    onChange={(e) => actualizar(i, 'apellido', e.target.value)}
                  />
                </div>

                {asistencia === 'si' && (
                  <>
                    <p className="confirmacion__subpregunta">Restricción alimentaria</p>
                    <div className="confirmacion__chips">
                      {RESTRICCIONES.map((r) => (
                        <button
                          type="button"
                          key={r.id}
                          className={`confirmacion__chip ${p.restricciones.includes(r.id) ? 'confirmacion__chip--activo' : ''}`}
                          onClick={() => alternarRestriccion(i, r.id)}
                          aria-pressed={p.restricciones.includes(r.id)}
                        >
                          {r.texto}
                        </button>
                      ))}
                    </div>

                    {p.restricciones.includes('alergia') && (
                      <input
                        className="campo"
                        type="text"
                        placeholder="¿A qué es alérgico/a?"
                        value={p.alergia}
                        onChange={(e) => actualizar(i, 'alergia', e.target.value)}
                      />
                    )}
                    {p.restricciones.includes('otra') && (
                      <input
                        className="campo"
                        type="text"
                        placeholder="¿Cuál?"
                        value={p.otra}
                        onChange={(e) => actualizar(i, 'otra', e.target.value)}
                      />
                    )}
                  </>
                )}
              </fieldset>
            ))}

          {/* Mensaje opcional */}
          {asistencia && (
            <textarea
              className="campo confirmacion__mensaje"
              placeholder="¿Querés dejarle un mensaje a Solcito? (opcional)"
              rows={3}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          )}

          {error && (
            <p className="confirmacion__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="boton boton--relleno"
            disabled={estado === 'enviando'}
          >
            {estado === 'enviando' ? 'Enviando…' : 'Confirmar asistencia'}
          </button>
        </form>
      )}

      <p className="confirmacion__limite">
        Podés confirmar hasta el <strong>{FECHA_LIMITE}</strong>.
      </p>
    </section>
  )
}