import { Link, NavLink, Route, Switch, useParams } from 'react-router-dom'
import './DashboardPaciente.css'
import Consumo from './Consumo'
import Intoxicacion from './Intoxicacion'
import Riesgos from './Riesgos'
import CryptoJS from 'crypto-js'
import logo from '../../../assets/TMB Color-01.svg'
import { InlineIcon } from '@iconify/react'
import iconoCopiar from '@iconify-icons/mdi/content-copy'
import iconoVolver from '@iconify-icons/mdi/chevron-left'
import { useEffect, useRef, useState } from 'react'
import { login } from '../../../helpers/api'

const DashboardPaciente = ({ idDirecto }) => {

  const { id } = useParams()
  const [jwtSU, setJwtSU] = useState()
  const [mostrandoIndicacionCopia, setMostrandoIndicacionCopia] = useState(false)
  const textoLink = useRef()
  const kLinkDirecto = CryptoJS.AES.encrypt(id || 'x', process.env.REACT_APP_AESK)

  const copiarLink = () => {
    textoLink.current.select()
    textoLink.current.setSelectionRange(0, 99999)
    document.execCommand('copy')
    setMostrandoIndicacionCopia(true)
  }

  useEffect(() => {
    if (idDirecto) {
      login(process.env.REACT_APP_USER, process.env.REACT_APP_PASSWORD)
        .then(res => {
          const { authorization: token } = res.headers
          console.log(token)
          setJwtSU(token)
        })
    }
  }, [idDirecto])

  useEffect(() => {
    if (mostrandoIndicacionCopia) {
      setTimeout(() => setMostrandoIndicacionCopia(false), 500)
    }
  }, [mostrandoIndicacionCopia])

  return (
    <div className="DashboardPaciente">
      <div className="DashboardPaciente__superior">
        {id && (
          <Link
            className="DashboardPaciente__boton_volver"
            to="/pacientes"
            title="Volver"
          >
            <InlineIcon icon={iconoVolver} />
          </Link>
        )}
        <img className="DashboardPaciente__logo" src={logo} alt="Logo TMB" />
        <h1 className="DashboardPaciente__titulo">Sus indicadores</h1>
        {id && (
          <div className="DashboardPaciente__contenedor_link_para_compartir">
            <label>Link para paciente:</label>
            <input
              ref={textoLink}
              className="DashboardPaciente__link_para_compartir"
              value={`${window.location.origin}/d?k=${encodeURIComponent(kLinkDirecto)}`}
            />
            <button
              className="DashboardPaciente__boton_copiar_link"
              title="Copiar link"
              onClick={copiarLink}
            >
              <InlineIcon icon={iconoCopiar} />
              {mostrandoIndicacionCopia && <div className="DashboardPaciente__indicador_copia">¡Copiado!</div>}
            </button>
          </div>
        )}
      </div>
      <nav className="DashboardPaciente__navegacion">
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={id ? `/paciente/${id}/consumo` : '/d/consumo'}>
            Consumo
          </NavLink>
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={id ? `/paciente/${id}/intoxicacion` : '/d/intoxicacion'}>
            Intoxicación
          </NavLink>
        <NavLink
          activeClassName="DashboardPaciente__link--activo"
          className="DashboardPaciente__link"
          to={id ? `/paciente/${id}/riesgos` : '/d/riesgos'}>
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
          <Route path={`/d/consumo`}>
            <Consumo idDirecto={idDirecto} jwtSU={jwtSU} />
          </Route>
          <Route path={`/d/intoxicacion`}>
            <Intoxicacion idDirecto={idDirecto} jwtSU={jwtSU} />
          </Route>
          <Route path={`/d/riesgos`}>
            <Riesgos idDirecto={idDirecto} jwtSU={jwtSU} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default DashboardPaciente