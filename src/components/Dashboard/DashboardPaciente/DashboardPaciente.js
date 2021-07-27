import { NavLink, Route, Switch, useParams } from 'react-router-dom'
import './DashboardPaciente.css'
import Consumo from './Consumo'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'
import logo from '../../../assets/TMB BN-03.svg'

const DashboardPaciente = () => {

  const { id } = useParams()

  return (
    <div className="DashboardPaciente">
      <div className="DashboardPaciente__superior">
        <img className="DashboardPaciente__logo" src={logo} alt="Logo TMB" />
        <h1 className="DashboardPaciente__titulo">Sus indicadores</h1>
      </div>
      <nav className="DashboardPaciente__navegacion">
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={`/paciente/${id}/consumo`}>
            Consumo
          </NavLink>
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={`/paciente/${id}/intoxicacion`}>
            Intoxicacion
          </NavLink>
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={`/paciente/${id}/riesgos`}>
            Riesgos
          </NavLink>
      </nav>
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