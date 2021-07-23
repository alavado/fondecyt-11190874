import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import BarraLateral from './BarraLateral'
import Consumo from './Consumo'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'
import Login from '../Login'
import './Dashboard.css'
import { borraToken } from '../../redux/ducks/login'

const Dashboard = () => {

  const { exp } = useSelector(state => state.login)
  const dispatch = useDispatch()

  if (!exp || exp < Date.now() / 1000) {
    dispatch(borraToken())
    return <Login />
  }

  return (
    <div className="Dashboard">
      <BarraLateral />
      <div className="Dashboard__contenedor">
        <Switch>
          <Route path="/consumo">
            <Consumo />
          </Route>
          <Route path="/intoxicacion">
            <Intoxicacion />
          </Route>
          <Route path="/riesgos">
            <Riesgos />
          </Route>
          <Route path="/">
            <Consumo />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard