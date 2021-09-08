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
    return 'Riesgo bajo'
  }
  if (puntaje <= 26) {
    return 'Riesgo moderado'
  }
  return 'Riesgo alto'
}

export const calificacionRiesgoFamiliar = indicador => {
  switch (+indicador) {
    case 0: return ['Riego bajo', 'Sin familiar']
    case 1: return ['Riesgo moderado', 'Familiar indirecto']
    default: return ['Riesgo alto', 'Familiar directo']
  }
}

export const porcentajeRiesgoFamiliar = indicador => {
  switch (+indicador) {
    case 0: return 10
    case 1: return 50
    default: return 80
  }
}

export const calificacionRiesgoEdadInicio = edad => {
  if (edad < 14) {
    return 'Riesgo muy alto'
  }
  if (edad < 18) {
    return 'Riesgo alto'
  }
  return 'Riesgo bajo'
}

export const porcentajeRiesgoEdadInicio = edad => {
  if (edad < 14) {
    return 95
  }
  if (edad < 18) {
    return 80
  }
  return 10
}

export const calificacionRiesgoPrimerProblema = edad => {
  if (edad < 18) {
    return 'Riesgo muy alto'
  }
  if (edad <= 35) {
    return 'Riesgo alto'
  }
  return 'Riesgo moderado'
}

export const porcentajeRiesgoPrimerProblema = edad => {
  if (edad < 18) {
    return 99
  }
  if (edad <= 35) {
    return 80
  }
  return 40
}