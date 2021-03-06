import { useCallback, useEffect, useMemo, useState } from 'react'
import iconoAgregar from '@iconify-icons/mdi/add'
import iconoEliminar from '@iconify-icons/mdi/close'
import './PlanDeCambio.css'
import { InlineIcon } from '@iconify/react'
import ListaElementosPlan from './ListaElementosPlan'
import ListaElementosMultiPlan from './ListaElementosMultiPlan'
import { actualizarPlanDeCambio, agregarPlanDeCambio, obtenerPlanDeCambio } from '../../../../helpers/api'
import { formatearPlan, planAJSON } from '../../../../helpers/formatos'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import _ from 'lodash'

const PlanDeCambio = ({ jwtSU, idDirecto }) => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery(`planDeCambio-${id}`, obtenerPlanDeCambio(jwtSU || jwt, idDirecto || id), { refetchOnWindowFocus: false })
  const [plan, setPlan] = useState()

  const actualizarPlanDeCambioEnServidor = useMemo((ahora = false) => _.debounce(async (jwt, idPaciente, plan) => {
    if (!plan.id) {
      const { data } = await agregarPlanDeCambio(jwt, idPaciente, formatearPlan(plan))()
      setPlan(plan => ({ ...plan, id: data.data.id }))
    }
    return actualizarPlanDeCambio(jwt, idPaciente, plan.id, formatearPlan(plan))()
  }, 1_000, { leading: ahora }), [])

  useEffect(() => {
    const planJSON = planAJSON(data)
    setPlan(planJSON)
  }, [data])

  if (isLoading || !plan) return <div>Cargando...</div>

  const cambiarValorDeElementoEnPropiedad = (tipo, indice, valor) => {
    if (jwtSU) {
      return
    }
    setPlan(plan => {
      const nuevoPlan = {
        ...plan,
        [tipo]: plan[tipo].map((v, i) => i === indice ? valor : v)
      }
      actualizarPlanDeCambioEnServidor(jwt, id, nuevoPlan)
      return nuevoPlan
    })
  }

  const agregarElementoVacioAPropiedad = tipo => {
    if (jwtSU) {
      return
    }
    setPlan(plan => {
      const nuevoPlan = {
        ...plan,
        [tipo]: [...plan[tipo], '']
      }
      actualizarPlanDeCambioEnServidor(jwt, id, nuevoPlan)
      return nuevoPlan
    })
  }

  const eliminarElementoDePropiedad = (tipo, indice) => {
    if (jwtSU) {
      return
    }
    setPlan(plan => {
      const nuevoPlan = {
        ...plan,
        [tipo]: plan[tipo].filter((v, i) => i !== indice)
      }
      actualizarPlanDeCambioEnServidor(jwt, id, nuevoPlan)
      return nuevoPlan
    })
  }

  return (
    <div className="PlanDeCambio">
      <h1>Plan de Cambio</h1>
      {/* {!jwtSU &&
        <button
          className="PlanDeCambio__boton_guardar"
          onClick={() => actualizarPlanDeCambioEnServidor(jwt, id, plan)}
        >
          Guardar
        </button>
      } */}
      <ListaElementosPlan
        elementos={plan.razones}
        propiedad="razones"
        titulo="Las razones m??s importantes por las que quiero hacer estos cambios son"
        textoBoton="Agregar raz??n"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.metas}
        propiedad="metas"
        titulo="Mis metas durante este proceso de cambio son"
        textoBoton="Agregar meta"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosMultiPlan
        elementos={[plan.cuandos, plan.acciones]}
        propiedades={['cuandos', 'acciones']}
        titulos={['??Cu??ndo?', 'Acci??n espec??fica']}
        tituloSuperior="Puedo hacer estas cosas para cumplir mis metas"
        textoBoton="Agregar acci??n"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.pasos}
        propiedad="pasos"
        titulo="Los primeros pasos que planeo para cambiar son"
        textoBoton="Agregar paso"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosMultiPlan
        elementos={[plan.personas, plan.modos]}
        propiedades={['personas', 'modos']}
        titulos={['Persona', 'Modos en que puede ayudarme']}
        tituloSuperior="Las formas en que otras personas pueden ayudarme son"
        textoBoton="Agregar persona"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosMultiPlan
        elementos={[plan.obstaculos, plan.comos]}
        propiedades={['obstaculos', 'comos']}
        titulos={['Obst??culo posible', 'C??mo responder']}
        tituloSuperior="Algunas cosas que podr??an interferir con mi plan son"
        textoBoton="Agregar obst??culo"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.resultados}
        propiedad="resultados"
        titulo="Sabr?? que mi plan est?? funcionando si veo estos resultados"
        textoBoton="Agregar resultado"
        editable={!jwtSU}
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
    </div>
  )
}

export default PlanDeCambio