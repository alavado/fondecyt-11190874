import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { antecedentes, assist, tlfb } from '../../../../helpers/api'
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

  const calificacionTolerancia = tolerancia => {
    switch (+tolerancia) {
      case 1: return 'Baja'
      case 2: return 'Media'
      case 3: return 'Alta'
      default: return 'Muy alta'
    }
  }

  const calificacionSustanciaAssist = (assist, letra) => {
    const puntaje = Object .keys(assist)
      .filter(k => k.endsWith(`_${letra}`))
      .reduce((s, k) => s + +assist[k], 0)
    if (puntaje <= 3) {
      return 'Bajo'
    }
    if (puntaje <= 26) {
      return 'Moderado'
    }
    return 'Alto'
  }

  const calificacionRiesgoFamiliar = indicador => {
    switch (+indicador) {
      case 0: return ['Bajo', 'Sin familiar']
      case 1: return ['Medio', 'Familiar indirecto']
      default: return ['Alto', 'Familiar directo']
    }
  }

  const calificacionRiesgoEdadInicio = edad => {
    if (edad < 14) {
      return 'Muy alto'
    }
    if (edad < 18) {
      return 'Alto'
    }
    return 'Bajo'
  }

  const calificacionRiesgoPrimerProblema = edad => {
    if (edad < 18) {
      return 'Muy alto'
    }
    if (edad <= 35) {
      return 'Alto'
    }
    return 'Moderado'
  }

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