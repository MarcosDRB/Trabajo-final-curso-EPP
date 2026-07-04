function TarjetaContador({ titulo, valor, onIncrementar, onReset }) {
  return (
    <article className="tarjeta-contador">
      <h3>{titulo}</h3>
      <p className="valor">{valor}</p>
      <div className="acciones">
        <button type="button" onClick={onIncrementar}>
          Incrementar
        </button>
        <button type="button" className="secundario" onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </article>
  )
}

export default TarjetaContador
