import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { pacientes, statusPacienteActivo } from '../../../helpers/api'
import './ListaPacientes.css'

const ListaPacientes = () => {

  const { jwt } = useSelector(state => state.login)
  const { isLoading, data, isError } = useQuery('pacientes', pacientes(jwt))

  if (isLoading) {
    return 'Cargando...'
  }

  if (isError) {
    return 'Error cargando pacientes'
  }

  const pacientesActivos = data.data.data.filter(p => p.attributes.status === statusPacienteActivo)
  console.log(pacientesActivos)

  return (
    <div className="ListaPacientes">
      Pacientes en estudio
      {pacientesActivos.map(p => (
        <div key={`fila-paciente-${p.id}`}>
          <Link to={`/paciente/${p.id}`}>
            {p.attributes.nombre}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ListaPacientes