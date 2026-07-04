function TareaFormulario({ texto, onTextoChange, onAgregar }) {
  return (
    <form className="tarea-form" onSubmit={onAgregar}>
      <input
        value={texto}
        onChange={(event) => onTextoChange(event.target.value)}
        placeholder="Escribe una tarea"
        aria-label="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default TareaFormulario
