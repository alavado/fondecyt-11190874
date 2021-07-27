import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { tlfb } from '../../../../helpers/api'
import './Intoxicacion.css'

const Intoxicacion = () => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery('tlfb', tlfb(jwt, id))

  if (isLoading) {
    return 'Cargando...'
  }

  if (!data?.data?.data?.attributes) {
    return 'Paciente no tiene datos'
  }

  const {
    bac_max,
    bac_media,
    gdd
  } = data.data.data.attributes

  return (
    <div className="Intoxicacion">
      <p>Alcoholemia maxima estimada de {bac_max} mg% por semana</p>
      <p>Gramos de alcohol en un dia tipico de consumo {gdd}</p>
      <p>Alcoholemia promedio en un dia de consumo {bac_media}</p>
      {/* <p>Agregar tabla</p> */}
    </div>
  )
}

export default Intoxicacion