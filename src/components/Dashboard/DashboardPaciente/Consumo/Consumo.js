import Icon from '@iconify/react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { tlfb } from '../../../../helpers/api'
import iconoTrago from '@iconify-icons/mdi/glass-cocktail'
import './Consumo.css'

const Consumo = ({ jwtSU, idDirecto }) => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery('tlfb', tlfb(jwtSU || jwt, idDirecto || id))

  if (isLoading) {
    return 'Cargando...'
  }

  if (!data?.data?.data?.attributes) {
    return 'Paciente no tiene datos'
  }

  const {
    t_dia_max,
    t_semana_max,
    t_semana_min,
    t_semana_promedio,
    tdd,
    gdd
  } = data.data.data.attributes

  return (
    <div className="Consumo">
      <div className="Consumo__contenedor">
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--importante">
          <p className="Consumo__encabezado"><span className="Consumo__texto_destacado">En un día típico</span><br />usted consumió</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(tdd)).fill(0).map((_, i) => <div key={`icono-tip-${i}`} className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(tdd)}</p>
          <p>tragos estándar</p>
          <p className="Consumo__subtitulo_cifra">equivalente a <span className="Consumo__cifra_pequeña">{Number(gdd).toLocaleString('de-DE')}</span> gramos de alcohol</p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">Su consumo máximo<br /><span className="Consumo__texto_destacado">en un solo día</span> fue</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_dia_max)).fill(0).map((_, i) => <div key={`icono-dia-${i}`} className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_dia_max)}</p>
          <p>tragos estándar</p>
        </div>
      </div>
      <div className="Consumo__contenedor">
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--importante">
          <p className="Consumo__encabezado"><span className="Consumo__texto_destacado">En promedio por semana</span><br />usted consumió</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_promedio)).fill(0).map((_, i) => <div key={`icono-prom-${i}`} className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_promedio)}</p>
          <p>tragos estándar</p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">En una semana<br /> su <span className="Consumo__texto_destacado">consumo mínimo</span> fue</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_min)).fill(0).map((_, i) => <div key={`icono-min-${i}`} className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_min)}</p>
          <p>tragos estándar</p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">En una semana<br /> su <span className="Consumo__texto_destacado">consumo máximo</span> fue</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_max)).fill(0).map((_, i) => <div key={`icono-max-${i}`} className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_max)}</p>
          <p>tragos estándar</p>
        </div>
      </div>
    </div>
  )
}

export default Consumo