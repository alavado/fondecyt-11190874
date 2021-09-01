import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { antecedentes, assist, tlfb } from '../../../../helpers/api'
import { calificacionRiesgoEdadInicio, calificacionRiesgoFamiliar, calificacionRiesgoPrimerProblema, calificacionSustanciaAssist, calificacionTolerancia } from '../../../../helpers/clasificaciones'
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

  return (
    <div className="Riesgos">
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Marihuana
        </p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionSustanciaAssist(datosAssist, 'c')}
        </p>
      </div>
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Cocaina
        </p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionSustanciaAssist(datosAssist, 'd')}
        </p>
      </div>
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Opiaceos
        </p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionSustanciaAssist(datosAssist, 'i')}
        </p>
      </div>
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Riesgo familiar
        </p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionRiesgoFamiliar(datosAntecedentes.familiarquien)[0]}
        </p>
      </div>
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Edad del primer consumo de alcohol
        </p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionRiesgoEdadInicio(datosAntecedentes.primeroh)}
        </p>
      </div>
      <div className="Riegos__contenedor_riesgo">
        <p className="Riesgos__nombre_riesgo">
          Edad del primer problema con el alcohol</p>
        <p className="Riesgos__etiqueta_riesgo">
          {calificacionRiesgoPrimerProblema(datosAntecedentes.primerprob)}
        </p>
      </div>
    </div>
  )
}

export default Riesgos