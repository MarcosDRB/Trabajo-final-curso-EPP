import { useEffect, useState } from 'react'
import TareaFiltros from './tareas/TareaFiltros'
import TareaFormulario from './tareas/TareaFormulario'
import TareaItem from './tareas/TareaItem'

const STORAGE_KEY = 'lista-tareas-react-vite'

const tareasIniciales = [
  { id: 1, texto: 'Aprender componentes en React', completada: false },
  { id: 2, texto: 'Practicar useState y eventos', completada: true },
]

function ListaTareas() {
  const [texto, setTexto] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [tareaArrastradaId, setTareaArrastradaId] = useState(null)
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem(STORAGE_KEY)
    if (!guardadas) {
      return tareasIniciales
    }

    try {
      const parseadas = JSON.parse(guardadas)
      if (Array.isArray(parseadas)) {
        return parseadas
      }
      return tareasIniciales
    } catch {
      return tareasIniciales
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas))
  }, [tareas])

  const agregarTarea = (event) => {
    event.preventDefault()

    const limpio = texto.trim()
    if (!limpio) {
      return
    }

    const nueva = {
      id: Date.now(),
      texto: limpio,
      completada: false,
    }

    setTareas((prev) => [nueva, ...prev])
    setTexto('')
  }

  const alternarTarea = (id) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea,
      ),
    )
  }

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id))
  }

  const guardarTarea = (id, nuevoTexto) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea,
      ),
    )
  }

  const limpiarCompletadas = () => {
    setTareas((prev) => prev.filter((tarea) => !tarea.completada))
  }

  const pendientes = tareas.filter((tarea) => !tarea.completada).length
  const completadas = tareas.length - pendientes

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'pendientes') {
      return !tarea.completada
    }
    if (filtro === 'completadas') {
      return tarea.completada
    }
    return true
  })

  const iniciarArrastre = (id) => {
    setTareaArrastradaId(id)
  }

  const permitirSoltar = (event) => {
    event.preventDefault()
  }

  const soltarSobre = (idDestino) => {
    if (!tareaArrastradaId || tareaArrastradaId === idDestino) {
      return
    }

    setTareas((prev) => {
      const origen = prev.findIndex((tarea) => tarea.id === tareaArrastradaId)
      const destino = prev.findIndex((tarea) => tarea.id === idDestino)

      if (origen < 0 || destino < 0) {
        return prev
      }

      const copia = [...prev]
      const [movida] = copia.splice(origen, 1)
      copia.splice(destino, 0, movida)
      return copia
    })

    setTareaArrastradaId(null)
  }

  return (
    <section className="lista-tareas">
      <h3>Lista de tareas</h3>
      <TareaFormulario
        texto={texto}
        onTextoChange={setTexto}
        onAgregar={agregarTarea}
      />

      <TareaFiltros
        filtro={filtro}
        pendientes={pendientes}
        completadas={completadas}
        onCambiarFiltro={setFiltro}
        onLimpiarCompletadas={limpiarCompletadas}
      />

      <ul>
        {tareasFiltradas.length === 0 ? (
          <li className="vacia">No hay tareas para este filtro.</li>
        ) : (
          tareasFiltradas.map((tarea) => (
            <TareaItem
              key={tarea.id}
              tarea={tarea}
              onAlternar={alternarTarea}
              onEliminar={eliminarTarea}
              onGuardar={guardarTarea}
              onDragStart={iniciarArrastre}
              onDragOver={permitirSoltar}
              onDrop={soltarSobre}
            />
          ))
        )}
      </ul>
    </section>
  )
}

export default ListaTareas
