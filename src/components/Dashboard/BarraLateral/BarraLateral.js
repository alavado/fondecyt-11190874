import { useDispatch } from 'react-redux'
import { NavLink as Link } from 'react-router-dom'
import logo from '../../../assets/TMB Color-03.svg'
import { borraToken } from '../../../redux/ducks/login'
import './BarraLateral.css'

const BarraLateral = () => {

  const dispatch = useDispatch()

  return (
    <nav className="BarraLateral">
      <img src={logo} className="BarraLateral__logo" />
      <Link className="BarraLateral__link" to="/consumo">Consumo</Link>
      <Link className="BarraLateral__link" to="/intoxicacion">Intoxicación</Link>
      <Link className="BarraLateral__link" to="/riesgos">Factores de riesgo</Link>
      <button className="BarraLateral__boton_imprimir">Imprimir</button>
      <button onClick={() => dispatch(borraToken())} className="BarraLateral__boton_imprimir">Cerrar sesión</button>
    </nav>
  )
}

export default BarraLateral