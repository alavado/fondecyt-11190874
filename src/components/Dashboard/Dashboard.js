import { Route, Switch } from 'react-router-dom'
import BarraLateral from './BarraLateral'
import Consumo from './Consumo'
import './Dashboard.css'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'

const Dashboard = () => {
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