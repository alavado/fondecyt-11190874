import { useState } from 'react'
import iconoAgregar from '@iconify-icons/mdi/add'
import iconoEliminar from '@iconify-icons/mdi/close'
import './PlanDeCambio.css'
import { InlineIcon } from '@iconify/react'
import ListaElementosPlan from './ListaElementosPlan'

const PlanDeCambio = ({ jwtSU, idDirecto }) => {

  const [plan, setPlan] = useState({
    razones: [''],
    metas: [''],
    pasos: [''],
    resultados: [''],

    // multis
    acciones: [''],
    cuandos: [''],
    personas: [''],
    modos: [''],
    obstaculos: [''],
    comos: [''],
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
      <p className="PlanDeCambio__tarjeta--ancha">Puedo hacer estas cosas para cumplir mis metas</p>
      <div className="PlanDeCambio__tarjeta">
        <label>¿Cuándo?</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta">
        <label>Acción específica</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <ListaElementosPlan
        elementos={plan.pasos}
        propiedad="pasos"
        titulo="Los primeros pasos que planeo para cambiar son"
        textoBoton="Agregar paso"
        agregar={agregarElementoVacioAPropiedad}
        editar={cambiarValorDeElementoEnPropiedad}
        eliminar={eliminarElementoDePropiedad}
      />
      <p className="PlanDeCambio__tarjeta--ancha">Las formas en que otras personas pueden ayudarme son</p>
      <div className="PlanDeCambio__tarjeta">
        <label>Persona</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta">
        <label>Modos posibles en que puede ayudarme</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <p className="PlanDeCambio__tarjeta--ancha">Algunas cosas que podrían interferir con mi plan son</p>
      <div className="PlanDeCambio__tarjeta">
        <label>Obstáculos posibles para el cambio</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta">
        <label>Cómo responder</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
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