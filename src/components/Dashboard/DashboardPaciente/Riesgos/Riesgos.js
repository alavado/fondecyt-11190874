import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { antecedentes, assist, tlfb } from '../../../../helpers/api'
import { calificacionRiesgoEdadInicio, calificacionRiesgoFamiliar, calificacionRiesgoPrimerProblema, calificacionSustanciaAssist, calificacionTolerancia } from '../../../../helpers/clasificaciones'
import './Riesgos.css'

const Riesgos = () => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading: loadingTlfb, data: dataTlfb } = useQuery('tlfb', tlfb(jwt, id))
  const { isLoading: loadingAssist, data: dataAssist } = useQuery('assist', assist(jwt, id))
  const { isLoading: loadingAntecedentes, data: dataAntecedentes } = useQuery('antecedentes', antecedentes(jwt, id))

  if (loadingTlfb || loadingAssist || loadingAntecedentes) {
    return 'Cargando...'
  }

  const { tolerancia } = dataTlfb.data.data.attributes
  const datosAssist = dataAssist.data.data.attributes
  const datosAntecedentes = dataAntecedentes.data.data.attributes

  return (
    <div className="Riesgos">
      Riesgos
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