import { NavLink as Link } from 'react-router-dom'
import logo from '../../../assets/TMB Color-03.svg'
import './BarraLateral.css'

const BarraLateral = () => {
  return (
    <nav className="BarraLateral">
      <img src={logo} className="BarraLateral__logo" />
      <Link className="BarraLateral__link" to="/consumo">Consumo</Link>
      <Link className="BarraLateral__link" to="/intoxicacion">Intoxicación</Link>
      <Link className="BarraLateral__link" to="/riesgos">Factores de riesgo</Link>
      <button className="BarraLateral__boton_imprimir">Imprimir</button>
    </nav>
  )
}

export default BarraLateral