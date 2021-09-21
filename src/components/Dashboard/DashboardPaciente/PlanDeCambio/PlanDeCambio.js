import './PlanDeCambio.css'

const PlanDeCambio = ({ jwtSU, idDirecto }) => {
  return (
    <div className="PlanDeCambio">
      <div className="PlanDeCambio__tarjeta PlanDeCambio__tarjeta--ancha">
        <label>Las razones más importantes por las que quiero hacer estos cambios son</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta PlanDeCambio__tarjeta--ancha">
        <label>Mis metas durante este proceso de cambio son</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <p className="PlanDeCambio__tarjeta--ancha">Puedo hacer estas cosas para cumplir mis metas</p>
      <div className="PlanDeCambio__tarjeta">
        <label>Acción específica</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta">
        <label>¿Cuándo?</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
      <div className="PlanDeCambio__tarjeta PlanDeCambio__tarjeta--ancha">
        <label>Los primeros pasos que planeo para cambiar son</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
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
      <div className="PlanDeCambio__tarjeta">
        <label>Sabré que mi plan está funcionando si veo estos resultados</label>
        <textarea className="PlanDeCambio__input"></textarea>
      </div>
    </div>
  )
}

export default PlanDeCambio