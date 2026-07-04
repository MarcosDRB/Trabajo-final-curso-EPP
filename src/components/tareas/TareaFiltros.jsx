function TareaFiltros({
  filtro,
  pendientes,
  completadas,
  onCambiarFiltro,
  onLimpiarCompletadas,
}) {
  return (
    <div className="tareas-controles">
      <p>{pendientes} pendientes</p>

      <div className="filtros">
        <button
          type="button"
          className={filtro === 'todas' ? 'activo' : ''}
          onClick={() => onCambiarFiltro('todas')}
        >
          Todas
        </button>
        <button
          type="button"
          className={filtro === 'pendientes' ? 'activo' : ''}
          onClick={() => onCambiarFiltro('pendientes')}
        >
          Pendientes
        </button>
        <button
          type="button"
          className={filtro === 'completadas' ? 'activo' : ''}
          onClick={() => onCambiarFiltro('completadas')}
        >
          Completadas
        </button>
      </div>

      <button
        type="button"
        className="limpiar"
        onClick={onLimpiarCompletadas}
        disabled={completadas === 0}
      >
        Limpiar completadas
      </button>
    </div>
  )
}

export default TareaFiltros
