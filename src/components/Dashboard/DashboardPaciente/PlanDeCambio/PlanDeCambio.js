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
  const { isLoading, data } = useQuery('planDeCambio', obtenerPlanDeCambio(jwtSU || jwt, idDirecto || id), { refetchOnWindowFocus: false })
  const [plan, setPlan] = useState()

  const actualizarPlanDeCambioEnServidor = useMemo(() => _.debounce((jwt, idPaciente, plan) => actualizarPlanDeCambio(jwt, idPaciente, plan.id, formatearPlan(plan))(), 2_000), [])

  useEffect(() => {
    setPlan(planAJSON(data))
  }, [data])

  if (isLoading || !plan) return <div>Cargando...</div>

  const cambiarValorDeElementoEnPropiedad = (tipo, indice, valor) => {
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
    setPlan(plan => {
      const nuevoPlan = {
        ...plan,
        [tipo]: plan[tipo].filter((v, i) => i !== indice)
      }
      actualizarPlanDeCambioEnServidor(jwt, id, nuevoPlan)
      return nuevoPlan
    })
  }
  console.log(plan)

  return (
    <div className="PlanDeCambio">
      <h1>Plan de Cambio</h1>
      <ListaElementosPlan
        elementos={plan.razones}
        propiedad="razones"
        titulo="Las razones más importantes por las que quiero hacer estos cambios son"
        textoBoton="Agregar razón"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.metas}
        propiedad="metas"
        titulo="Mis metas durante este proceso de cambio son"
        textoBoton="Agregar meta"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosMultiPlan
        elementos={[plan.cuandos, plan.acciones]}
        propiedades={['cuandos', 'acciones']}
        titulos={['¿Cuándo?', 'Acción específica']}
        tituloSuperior="Puedo hacer estas cosas para cumplir mis metas"
        textoBoton="Agregar acción"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.pasos}
        propiedad="pasos"
        titulo="Los primeros pasos que planeo para cambiar son"
        textoBoton="Agregar paso"
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
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosMultiPlan
        elementos={[plan.obstaculos, plan.comos]}
        propiedades={['obstaculos', 'comos']}
        titulos={['Obstáculo posible', 'Cómo responder']}
        tituloSuperior="Algunas cosas que podrían interferir con mi plan son"
        textoBoton="Agregar obstáculo"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <ListaElementosPlan
        elementos={plan.resultados}
        propiedad="resultados"
        titulo="Sabré que mi plan está funcionando si veo estos resultados"
        textoBoton="Agregar resultado"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
    </div>
  )
}

export default PlanDeCambio