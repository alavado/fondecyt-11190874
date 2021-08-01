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

  const { tolerancia } = dataTlfb.data.data.attributes
  const datosAssist = dataAssist.data.data.attributes
  const datosAntecedentes = dataAntecedentes.data.data.attributes

  return (
    <div className="Riesgos">
      <p>Tolerancia {calificacionTolerancia(tolerancia)}</p>
      <p>Marihuana {calificacionSustanciaAssist(datosAssist, 'c')}</p>
      <p>Cocaina {calificacionSustanciaAssist(datosAssist, 'd')}</p>
      <p>Opiaceos {calificacionSustanciaAssist(datosAssist, 'i')}</p>
      <p>Riesgo familiar {calificacionRiesgoFamiliar(datosAntecedentes.familiarquien)[0]}</p>
      <p>Edad del primer consumo de alcohol {calificacionRiesgoEdadInicio(datosAntecedentes.primeroh)}</p>
      <p>Edad del primer problema con el alcohol {calificacionRiesgoPrimerProblema(datosAntecedentes.primerprob)}</p>
    </div>
  )
}

export default Riesgos