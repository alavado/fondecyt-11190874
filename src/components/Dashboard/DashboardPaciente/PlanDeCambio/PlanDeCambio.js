import { useState } from 'react'
import iconoAgregar from '@iconify-icons/mdi/add'
import iconoEliminar from '@iconify-icons/mdi/close'
import './PlanDeCambio.css'
import { InlineIcon } from '@iconify/react'
import ListaElementosPlan from './ListaElementosPlan'
import ListaElementosMultiPlan from './ListaElementosMultiPlan'

const PlanDeCambio = ({ jwtSU, idDirecto }) => {

  const [plan, setPlan] = useState({
    razones: [],
    metas: [],
    pasos: [],
    resultados: [],

    // multis
    acciones: [],
    cuandos: [],
    personas: [],
    modos: [],
    obstaculos: [],
    comos: [],
  })

  const cambiarValorDeElementoEnPropiedad = (tipo, indice, valor) => {
    setPlan({
      ...plan,
      [tipo]: plan[tipo].map((v, i) => i === indice ? valor : v)
    })
  }

  const agregarElementoVacioAPropiedad = tipo => {
    setPlan({
      ...plan,
      [tipo]: [...plan[tipo], '']
    })
  }

  const eliminarElementoDePropiedad = (tipo, indice) => {
    setPlan({
      ...plan,
      [tipo]: plan[tipo].filter((v, i) => i !== indice)
    })
  }

  return (
    <div className="PlanDeCambio">
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