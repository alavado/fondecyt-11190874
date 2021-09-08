import classNames from 'classnames'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { antecedentes, assist, tlfb } from '../../../../helpers/api'
import { calificacionRiesgoEdadInicio, calificacionRiesgoFamiliar, calificacionRiesgoPrimerProblema, calificacionSustanciaAssist } from '../../../../helpers/clasificaciones'
import './Riesgos.css'

const Riesgos = ({ jwtSU, idDirecto }) => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading: loadingTlfb, data: dataTlfb } = useQuery('tlfb', tlfb(jwtSU || jwt, idDirecto || id))
  const { isLoading: loadingAssist, data: dataAssist } = useQuery('assist', assist(jwtSU || jwt, idDirecto || id))
  const { isLoading: loadingAntecedentes, data: dataAntecedentes } = useQuery('antecedentes', antecedentes(jwtSU || jwt, idDirecto || id))

  if (loadingTlfb || loadingAssist || loadingAntecedentes) {
    return 'Cargando...'
  }

  if (!dataTlfb?.data?.data?.attributes || !dataAssist?.data?.data?.attributes || !dataAntecedentes?.data?.data?.attributes) {
    return 'Paciente no tiene datos'
  }

  const datosAssist = dataAssist.data.data.attributes
  const datosAntecedentes = dataAntecedentes.data.data.attributes
  const sustancias = [
    {
      nombre: 'Marihuana',
      riesgo: calificacionSustanciaAssist(datosAssist, 'c'),
    },
    {
      nombre: 'Cocaína',
      riesgo: calificacionSustanciaAssist(datosAssist, 'd'),
    },
    {
      nombre: 'Opiáceos',
      riesgo: calificacionSustanciaAssist(datosAssist, 'i'),
    },
  ]
  const importantes = [
    {
      nombre: 'Riesgo familiar',
      riesgo: calificacionRiesgoFamiliar(datosAntecedentes.familiarquien)[0],
    },
    {
      nombre: 'Edad del primer consumo de alcohol',
      riesgo: calificacionRiesgoEdadInicio(datosAntecedentes.primeroh),
    },
    {
      nombre: 'Edad del primer problema con el alcohol',
      riesgo: calificacionRiesgoPrimerProblema(datosAntecedentes.primerprob),
    },
  ]

  return (
    <div className="Riesgos">
      <div className="Riesgos__sustancias">
        <h2 className="Riesgos__subtitulo">Riesgo asociado al consumo de otras sustancias</h2>
        <table className="Riesgos__tabla_sustancias">
          <tbody>
            {sustancias.map(r => (
              <tr
                key={`fila-riesgo-${r.nombre}`}
                className={classNames({
                  'Riesgos__fila_tabla_sustancias--alto': r.riesgo === "Riesgo alto",
                  'Riesgos__fila_tabla_sustancias--moderado': r.riesgo === "Riesgo moderado",
                  'Riesgos__fila_tabla_sustancias--bajo': r.riesgo === "Riesgo bajo"
                })}
              >
                <td>{r.nombre}</td>
                <td>{r.riesgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Riesgos__importantes">
        {importantes.map(r => (
          <div
            key={`riesgo-${r.nombre}`}
            className="Riegos__contenedor_riesgo"
          >
            <p className="Riesgos__subtitulo">
              Riesgo familiar
            </p>
            <p className="Riesgos__etiqueta_riesgo">
              {calificacionRiesgoFamiliar(datosAntecedentes.familiarquien)[0]}
            </p>
            <div
              className={classNames({
                'Riesgos__velocimetro': true,
                'Riesgos__velocimetro--muy-alto': r.riesgo === "Riesgo muy alto",
                'Riesgos__velocimetro--alto': r.riesgo === "Riesgo alto",
                'Riesgos__velocimetro--moderado': r.riesgo === "Riesgo moderado",
                'Riesgos__velocimetro--bajo': r.riesgo === "Riesgo bajo"
              })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Riesgos