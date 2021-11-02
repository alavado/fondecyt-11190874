import iconoAgregar from '@iconify-icons/mdi/add'
import iconoEliminar from '@iconify-icons/mdi/close'
import Icon, { InlineIcon } from '@iconify/react'
import iconoFlecha from '@iconify-icons/mdi/arrow-right-bold'
import './ListaElementosMultiPlan.css'

const ListaElementosMultiPlan = ({ propiedades, titulos, tituloSuperior, textoBoton, elementos, agregar, editar, eliminar }) => {

  const [propiedadIzq, propiedadDer] = propiedades
  const [tituloIzq, tituloDer] = titulos
  const [elementosIzq, elementosDer] = elementos

  return (
    <div className="PlanDeCambio__tarjeta PlanDeCambio__tarjeta--ancha">
      <h3>{tituloSuperior}</h3>
      <div className="ListaElementosMultiPlan__titulo_lista">
        <div className="PlanDeCambio__elemento_lista_contenido">
          <h3>{tituloIzq}</h3>
          <Icon icon={iconoFlecha} className="ListaElementosMultiPlan__icono_flecha" />
          <h3>{tituloDer}</h3>
        </div>
      </div>
      <ol className="PlanDeCambio__lista">
        {elementosIzq.map((p, i) => (
          <li
            key={`razones-${i}`}
            className="PlanDeCambio__elemento_lista"
          >
            <button
              className="PlanDeCambio__boton_eliminar"
              title="Eliminar este elemento"
              onClick={() => eliminar(propiedadIzq, i)}
            >
              <InlineIcon icon={iconoEliminar} />
            </button>
            <div className="PlanDeCambio__elemento_lista_contenido PlanDeCambio__elemento_lista_contenido--multi">
              <input
                className="PlanDeCambio__input"
                onChange={e => editar(propiedadIzq, i, e.target.value)}
                value={p}
              />
              <Icon icon={iconoFlecha} className="ListaElementosMultiPlan__icono_flecha" />
              <input
                className="PlanDeCambio__input"
                onChange={e => editar(propiedadDer, i, e.target.value)}
                value={elementosDer[i]}
              />
            </div>
          </li>
        ))}
      </ol>
      {elementos.length < 5 && (
        <button
          className="PlanDeCambio__boton_agregar"
          onClick={() => agregar(propiedadIzq)}
        >
          <InlineIcon icon={iconoAgregar} /> {textoBoton}
        </button>
      )}
    </div>
  )
}

export default ListaElementosMultiPlan