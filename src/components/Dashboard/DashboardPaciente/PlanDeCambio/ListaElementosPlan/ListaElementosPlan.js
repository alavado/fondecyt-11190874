import iconoAgregar from '@iconify-icons/mdi/add'
import iconoEliminar from '@iconify-icons/mdi/close'
import { InlineIcon } from '@iconify/react'
import './ListaElementosPlan.css'

const ListaElementosPlan = ({ propiedad, titulo, textoBoton, elementos, agregar, editar, eliminar, editable }) => {

  return (
    <div className="PlanDeCambio__tarjeta PlanDeCambio__tarjeta--ancha">
      <h3 className="PlanDeCambio__titulo_superior">{titulo}</h3>
      <ol className="PlanDeCambio__lista">
        {elementos.map((p, i) => (
          <li
            key={`razones-${i}`}
            className="PlanDeCambio__elemento_lista"
          >
            <button
              className="PlanDeCambio__boton_eliminar"
              title="Eliminar este elemento"
              onClick={() => eliminar(propiedad, i)}
            >
              <InlineIcon icon={iconoEliminar} />
            </button>
            <input
              className="PlanDeCambio__input"
              onChange={e => editar(propiedad, i, e.target.value)}
              value={p}
            />
          </li>
        ))}
      </ol>
      {editable && elementos.length < 5 && (
        <button
          className="PlanDeCambio__boton_agregar"
          onClick={() => agregar(propiedad)}
        >
          <InlineIcon icon={iconoAgregar} /> {textoBoton}
        </button>
      )}
    </div>
  )
}

export default ListaElementosPlan