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
    percentil,
    t_dia_max,
    t_semana_max,
    t_semana_min,
    t_semana_promedio,
    tdd
  } = data.data.data.attributes

  return (
    <div className="Consumo">
      <div className="Consumo__contenedor">
        <div className="Consumo__consumo_semanal">
          <p className="Consumo__encabezado">Usted consume</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(tdd)).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(tdd)}</p>
          <p>tragos estándar <br /><span className="Consumo__texto_destacado">en un día típico</span></p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">Su consumo máximo es de</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_dia_max)).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_dia_max)}</p>
          <p>tragos estándar <br /><span className="Consumo__texto_destacado">en un día</span></p>
        </div>
      </div>
      <div className="Consumo__contenedor">
        <div className="Consumo__consumo_semanal">
          {/* <Icon className="Consumo__icono_trago" icon={iconoTrago} /> */}
          <p className="Consumo__encabezado">Usted consume</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_promedio)).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_promedio)}</p>
          <p>tragos estándar <br /><span className="Consumo__texto_destacado">por semana</span></p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">Su consumo mínimo es de</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_min)).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_min)}</p>
          <p>tragos estándar <br /><span className="Consumo__texto_destacado">en una semana</span></p>
        </div>
        <div className="Consumo__consumo_semanal Consumo__consumo_semanal--pequeño">
          <p className="Consumo__encabezado">Su consumo máximo es de</p>
          <div className="Consumo__iconos_tragos">{Array(Math.round(t_semana_max)).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoTrago} /></div>)}</div>
          <p className="Consumo__cifra_grande">{Math.round(t_semana_max)}</p>
          <p>tragos estándar <br /><span className="Consumo__texto_destacado">en una semana</span></p>
        </div>
      </div>
    </div>
  )
}

export default Consumo