import { Link, Route, Switch, useParams } from 'react-router-dom'
import './DashboardPaciente.css'
import Consumo from './Consumo'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'

const DashboardPaciente = () => {

  const { id } = useParams()

  return (
    <div className="DashboardPaciente">
      DashboardPaciente {id}
      <Link to={`/paciente/${id}/consumo`}>Consumo</Link>
      <Link to={`/paciente/${id}/intoxicacion`}>Intoxicacion</Link>
      <Link to={`/paciente/${id}/riesgos`}>Riesgos</Link>
      <Switch>
        <Route path={`/paciente/:id/consumo`}>
          <Consumo />
        </Route>
        <Route path={`/paciente/:id/intoxicacion`}>
          <Intoxicacion />
        </Route>
        <Route path={`/paciente/:id/riesgos`}>
          <Riesgos />
        </Route>
      </Switch>
    </div>
  )
}

export default DashboardPaciente