import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { pacientes, statusPacienteActivo } from '../../../helpers/api'
import { borraToken } from '../../../redux/ducks/login'
import './ListaPacientes.css'

const ListaPacientes = () => {

  const { jwt } = useSelector(state => state.login)
  const { isLoading, data, isError } = useQuery('pacientes', pacientes(jwt))
  const dispatch = useDispatch()

  if (isLoading) {
    return 'Cargando...'
  }

  if (isError) {
    return 'Error cargando pacientes'
  }

  const pacientesActivos = data.data.data.filter(p => p.attributes.status === statusPacienteActivo)

  return (
    <div className="ListaPacientes">
      <h1 className="ListaPacientes__titulo">Pacientes en estudio <button onClick={() => dispatch(borraToken())}>Cerrar sesión</button></h1>
      {pacientesActivos.map(p => (
        <div className="ListaPacientes__elemento" key={`fila-paciente-${p.id}`}>
          <Link to={`/paciente/${p.id}/consumo`}>
            {p.attributes.nombre}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ListaPacientes