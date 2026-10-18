import { useRef, useState } from 'react'
import './App.css'
import Portada from './componentes/Portada/Portada'
import Musica from './componentes/Musica/Musica'
import FondoPlaya from './componentes/FondoPlaya/FondoPlaya'
import Hero from './componentes/Hero/Hero'
// Las siguientes las vamos descomentando a medida que las creamos:
 import Fecha from './componentes/Fecha/Fecha'
import CuentaRegresiva from './componentes/CuentaRegresiva/CuentaRegresiva'
import Lugar from './componentes/Lugar/Lugar'
 import DressCode from './componentes/DressCode/DressCode'
 import Playlist from './componentes/Playlist/Playlist'
import Regalo from './componentes/Regalo/Regalo'
import Album from './componentes/Album/Album'
import Confirmacion from './componentes/Confirmacion/Confirmacion'

export default function App() {
  const [entro, setEntro] = useState(false)
  const audioRef = useRef(null)

  // Se ejecuta al tocar "Entrar": muestra el Hero y arranca la música
  const entrar = () => {
    setEntro(true)
    audioRef.current?.play().catch(() => {})
  }

  return (
    <>
      <Portada onEntrar={entrar} />
      <Musica audioRef={audioRef} visible={entro} />
      <FondoPlaya />

      <main className="contenido">
        {/* Tramo 1: el mar y el sol */}
        <div data-tramo="1">
          <Hero activo={entro} />
           <Fecha /> 
           <CuentaRegresiva /> 
        </div>

        {/* Tramo 2: la arena */}
        <div data-tramo="2">
           <Lugar /> 
           <DressCode /> 
           <Playlist /> 
        </div>

        {/* Tramo 3: la orilla */}
        <div data-tramo="3">
           <Regalo /> 
           <Album /> 
           <Confirmacion /> 
        </div>
      </main>
    </>
  )
}