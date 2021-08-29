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
      <p className="Comparacion__encabezado">Por cada 100 personas de su edad en Chile</p>
      <div className="Comparacion__contenedor_personas">
        <div className="Comparacion__contenedor_iconos">
          {Array(nConsumenMenos).fill(0).map(() => <div className="Comparacion__icono"><Icon icon={iconoUsuario} /></div>)}
        </div>
        <p className="Comparacion__bajada_personas"><span className="Comparacion__cifra">{nConsumenMenos} persona{nConsumenMenos !== 1 ? 's' : ''}</span> consume{nConsumenMenos !== 1 ? 'n' : ''}<br /> <strong className="Comparacion__texto_destacado">menos que usted</strong></p>
        <div className="Comparacion__usted"><Icon icon={iconoUsuario} /></div>
        <div />
        <div className="Comparacion__contenedor_iconos">
          {Array(nConsumenMas).fill(0).map(() => <div className="Comparacion__icono"><Icon icon={iconoUsuario} /></div>)}
        </div>
        <p className="Comparacion__bajada_personas"><span className="Comparacion__cifra">{nConsumenMas} persona{nConsumenMas !== 1 ? 's' : ''}</span> consume{nConsumenMas !== 1 ? 'n' : ''}<br /> <strong className="Comparacion__texto_destacado">más que usted</strong></p>
      </div>
    </div>
  )
}

export default Comparacion