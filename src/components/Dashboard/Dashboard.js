import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../Login'
import './Dashboard.css'
import { borraToken } from '../../redux/ducks/login'
import ListaPacientes from './ListaPacientes'
import DashboardPaciente from './DashboardPaciente/DashboardPaciente'

const Dashboard = () => {

  const { exp } = useSelector(state => state.login)
  const dispatch = useDispatch()

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
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard