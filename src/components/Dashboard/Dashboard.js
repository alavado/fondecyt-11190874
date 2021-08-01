import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../Login'
import './Dashboard.css'
import { borraToken } from '../../redux/ducks/login'
import ListaPacientes from './ListaPacientes'
import DashboardPaciente from './DashboardPaciente/DashboardPaciente'
import CryptoJS from 'crypto-js'

const Dashboard = () => {

  const { exp } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const tokenDirecto = (new URLSearchParams(window.location.search)).get('k')

  if (tokenDirecto) {
    const base64 = CryptoJS.AES.decrypt(decodeURIComponent(tokenDirecto), process.env.REACT_APP_AESK)
    const id = CryptoJS.enc.Latin1.stringify(base64)
    if (!id) {
      return 'El link directo no es válido'
    }
  }

  if (!exp || exp < Date.now() / 1000) {
    dispatch(borraToken())
    return <Login />
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard__contenedor">
        <Switch>
          <Route path="/paciente/:id">
            <DashboardPaciente />
          </Route>
          <Route path="/">
            <ListaPacientes />
          </Route>
          <Route path="/d">
            <DashboardPaciente />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard