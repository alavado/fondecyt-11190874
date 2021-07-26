export const calificacionTolerancia = tolerancia => {
  switch (+tolerancia) {
    case 1: return 'Baja'
    case 2: return 'Media'
    case 3: return 'Alta'
    default: return 'Muy alta'
  }
}

export const calificacionSustanciaAssist = (assist, letra) => {
  const puntaje = Object.keys(assist)
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

export const calificacionRiesgoFamiliar = indicador => {
  switch (+indicador) {
    case 0: return ['Bajo', 'Sin familiar']
    case 1: return ['Medio', 'Familiar indirecto']
    default: return ['Alto', 'Familiar directo']
  }
}

export const calificacionRiesgoEdadInicio = edad => {
  if (edad < 14) {
    return 'Muy alto'
  }
  if (edad < 18) {
    return 'Alto'
  }
  return 'Bajo'
}

export const calificacionRiesgoPrimerProblema = edad => {
  if (edad < 18) {
    return 'Muy alto'
  }
  if (edad <= 35) {
    return 'Alto'
  }
  return 'Moderado'
}