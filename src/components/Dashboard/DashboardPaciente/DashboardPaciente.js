import { NavLink, Route, Switch, useParams } from 'react-router-dom'
import './DashboardPaciente.css'
import Consumo from './Consumo'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'
import CryptoJS from 'crypto-js'
import logo from '../../../assets/TMB Color-01.svg'

const DashboardPaciente = () => {

  const { id } = useParams()
  const kLinkDirecto = CryptoJS.AES.encrypt(id, process.env.REACT_APP_AESK)

  return (
    <div className="DashboardPaciente">
      <div className="DashboardPaciente__superior">
        <img className="DashboardPaciente__logo" src={logo} alt="Logo TMB" />
        <h1 className="DashboardPaciente__titulo">Sus indicadores</h1>
        <div className="DashboardPaciente__contenedor_link_para_compartir">
          <label>Link directo:</label>
          <input
            className="DashboardPaciente__link_para_compartir"
            value={`${window.location.origin}?k=${encodeURIComponent(kLinkDirecto)}`}
          />
          <button>Copiar</button>
        </div>
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
            Intoxicación
          </NavLink>
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={`/paciente/${id}/riesgos`}>
            Riesgos
          </NavLink>
      </nav>
      <div className="DashboardPaciente__contenedor">
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
    </div>
  )
}

export default DashboardPaciente