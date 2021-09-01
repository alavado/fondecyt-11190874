import { useMemo } from 'react'
import { useQuery } from 'react-query'
import iconoCerrarSesion from '@iconify-icons/mdi/logout'
import { useDispatch, useSelector } from 'react-redux'
import logoColor from '../../../assets/TMB Color-02.svg'
import { useTable } from 'react-table'
import { pacientes, statusPacienteActivo } from '../../../helpers/api'
import { borraToken } from '../../../redux/ducks/login'
import './ListaPacientes.css'
import { differenceInYears, parse } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { InlineIcon } from '@iconify/react'

const ListaPacientes = () => {

  const { jwt } = useSelector(state => state.login)
  const { isLoading, data: dataPacientesAPI, isError } = useQuery('pacientes', pacientes(jwt))
  const dispatch = useDispatch()
  const history = useHistory()

  const data = useMemo(() => {
    if (!dataPacientesAPI) {
      return []
    }
    const data = dataPacientesAPI.data.data
      .filter(p => p.attributes.status === statusPacienteActivo)
      .map(paciente => ({
        id: paciente.id,
        nombre: paciente.attributes.nombre,
        edad: `${differenceInYears(Date.now(), parse(paciente.attributes.f_nac, 'yyyy-MM-dd', new Date()))} años`,
        fono: [paciente.attributes.fono1, paciente.attributes.fono2, paciente.attributes.fono3, paciente.attributes.fono4].filter(x => x).join(', '),
        domicilio: paciente.attributes.domicilio,
        email: paciente.attributes.email,
        estado: paciente.attributes.status,
        comentario: paciente.attributes.comentario
      }))
    return data
  }, [dataPacientesAPI])

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Edad',
      accessor: 'edad',
    },
    {
      Header: 'Teléfono',
      accessor: 'fono',
    },
    {
      Header: 'E-mail',
      accessor: 'email',
    },
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  if (isLoading) {
    return 'Cargando...'
  }

  if (isError) {
    return 'Error cargando pacientes'
  }

  return (
    <div className="ListaPacientes">
      <div className="ListaPacientes__encabezado">
        <h1 className="ListaPacientes__titulo"><img src={logoColor} className="ListaPacientes__logo" alt="Logo TMB" /> Pacientes en estudio (estado = 8)</h1>
        <button
          onClick={() => dispatch(borraToken())}
          className="ListaPacientes__boton_cerrar_sesion"
        >
          <InlineIcon icon={iconoCerrarSesion} />
          Cerrar sesión
        </button>
      </div>
      <table className="ListaPacientes__tabla" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => history.push(`/paciente/${row.original.id}/consumo`)}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListaPacientes