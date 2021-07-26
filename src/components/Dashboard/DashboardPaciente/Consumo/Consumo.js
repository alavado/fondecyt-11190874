import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { tlfb } from '../../../../helpers/api'
import './Consumo.css'

const Consumo = () => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery('tlfb', tlfb(jwt, id))

  if (isLoading) {
    return 'Cargando...'
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
      <p>Usted consume {t_semana_promedio} tragos estandar por semana</p>
      <p>Si lo comparamos con otras personas de su edad en Chile {percentil} de cada 100 personas consumen mas que usted</p>
      <p>Tragos maximos por semana {t_semana_max}</p>
      <p>Tragos minimos por semana {t_semana_min}</p>
      <p>Maxima cantidad de tragos en un dia de consumo {t_dia_max}</p>
      <p>Tragos consumidos en un dia tipico {tdd}</p>
    </div>
  )
}

export default Consumo