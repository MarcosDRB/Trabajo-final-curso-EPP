import { useState } from 'react'

function TareaItem({
  tarea,
  onAlternar,
  onEliminar,
  onGuardar,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [estaEditando, setEstaEditando] = useState(false)
  const [textoEditado, setTextoEditado] = useState(tarea.texto)

  const guardarEdicion = () => {
    const limpio = textoEditado.trim()
    if (!limpio) {
      return
    }

    onGuardar(tarea.id, limpio)
    setEstaEditando(false)
  }

  const cancelarEdicion = () => {
    setTextoEditado(tarea.texto)
    setEstaEditando(false)
  }

  return (
    <li
      className="tarea-item"
      draggable
      onDragStart={() => onDragStart(tarea.id)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(tarea.id)}
    >
      <div className="tarea-contenido">
        <label>
          <input
            type="checkbox"
            checked={tarea.completada}
            onChange={() => onAlternar(tarea.id)}
          />
        </label>

        {estaEditando ? (
          <input
            className="editar-input"
            value={textoEditado}
            onChange={(event) => setTextoEditado(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                guardarEdicion()
              }
              if (event.key === 'Escape') {
                cancelarEdicion()
              }
            }}
            autoFocus
          />
        ) : (
          <span className={tarea.completada ? 'hecha' : ''}>{tarea.texto}</span>
        )}
      </div>

      <div className="item-acciones">
        {estaEditando ? (
          <>
            <button type="button" className="editar" onClick={guardarEdicion}>
              Guardar
            </button>
            <button type="button" className="cancelar" onClick={cancelarEdicion}>
              Cancelar
            </button>
          </>
        ) : (
          <button type="button" className="editar" onClick={() => setEstaEditando(true)}>
            Editar
          </button>
        )}
        <button type="button" className="eliminar" onClick={() => onEliminar(tarea.id)}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default TareaItem
