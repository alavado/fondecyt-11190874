import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import iconoUsuario from '@iconify-icons/mdi/human-male'
import './Comparacion.css'
import Icon from '@iconify/react'
import { tlfb } from '../../../../helpers/api'

const Comparacion = ({ jwtSU, idDirecto }) => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery('tlfb', tlfb(jwtSU || jwt, idDirecto || id))

  if (isLoading) {
    return 'Cargando...'
  }

  if (!data?.data?.data?.attributes) {
    return 'Paciente no tiene datos'
  }

  const { percentil } = data.data.data.attributes

  const nConsumenMenos = +percentil
  const nConsumenMas = 100 - +percentil

  return (
    <div className="Comparacion">
      <div className="Consumo__comparacion">
        <p className="Consumo__encabezado">Por cada 100 personas de su edad en Chile</p>
        <div className="Consumo__contenedor_personas">
          <div className="Consumo__contenedor_iconos">
            {Array(nConsumenMenos).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoUsuario} /></div>)}
          </div>
          <p className="Consumo__bajada_personas"><span className="Consumo__cifra">{nConsumenMenos} persona{nConsumenMenos !== 1 ? 's' : ''}</span> consume{nConsumenMenos !== 1 ? 'n' : ''}<br /> <strong className="Consumo__texto_destacado">menos que usted</strong></p>
          <div className="Consumo__usted"><Icon icon={iconoUsuario} /></div>
          <div />
          <div className="Consumo__contenedor_iconos">
            {Array(nConsumenMas).fill(0).map(() => <div className="Consumo__icono"><Icon icon={iconoUsuario} /></div>)}
          </div>
          <p className="Consumo__bajada_personas"><span className="Consumo__cifra">{nConsumenMas} persona{nConsumenMas !== 1 ? 's' : ''}</span> consume{nConsumenMas !== 1 ? 'n' : ''}<br /> <strong className="Consumo__texto_destacado">más que usted</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Comparacion