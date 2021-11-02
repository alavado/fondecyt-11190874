const atributosPlan = (plan, prefijo) => {
  const atributos = Object.keys(plan.attributes).filter(k => k.startsWith(prefijo))
  const indicePrimerAtributoVacio = atributos.findIndex(k => !plan.attributes[k])
  return (indicePrimerAtributoVacio ? atributos.slice(0, indicePrimerAtributoVacio) : []).map(k => plan.attributes[k])
}

export const planAJSON = data => {

  if (!data) {
    return false
  }

  const planes = data.data.data

  if (planes.length === 0) {
    return {
      razones: [],
      metas: [],
      pasos: [],
      resultados: [],
      acciones: [],
      cuandos: [],
      personas: [],
      modos: [],
      obstaculos: [],
      comos: [],
    }
  }

  const ultimoPlan = planes[planes.length - 1]

  return {
    id: ultimoPlan.id,
    razones: atributosPlan(ultimoPlan, 'razon'),
    metas: atributosPlan(ultimoPlan, 'meta'),
    pasos: atributosPlan(ultimoPlan, 'paso'),
    resultados: atributosPlan(ultimoPlan, 'resultado'),
    acciones: atributosPlan(ultimoPlan, 'accion'),
    cuandos: atributosPlan(ultimoPlan, 'cuando'),
    personas: atributosPlan(ultimoPlan, 'persona'),
    modos: atributosPlan(ultimoPlan, 'modo'),
    obstaculos: atributosPlan(ultimoPlan, 'obstaculo'),
    comos: atributosPlan(ultimoPlan, 'como'),
  }
}

export const formatearPlan = plan => {

  const { razones, metas, pasos, resultados, acciones, cuandos, personas, modos, obstaculos, comos } = plan

  return {
    "razon_1": razones[0] || '',
    "razon_2": razones[1] || '',
    "razon_3": razones[2] || '',
    "razon_4": razones[3] || '',
    "razon_5": razones[4] || '',
    "meta_1": metas[0] || '',
    "meta_2": metas[1] || '',
    "meta_3": metas[2] || '',
    "meta_4": metas[3] || '',
    "meta_5": metas[4] || '',
    "paso_1": pasos[0] || '',
    "paso_2": pasos[1] || '',
    "paso_3": pasos[2] || '',
    "paso_4": pasos[3] || '',
    "paso_5": pasos[4] || '',
    "resultado_1": resultados[0] || '',
    "resultado_2": resultados[1] || '',
    "resultado_3": resultados[2] || '',
    "resultado_4": resultados[3] || '',
    "resultado_5": resultados[4] || '',
    "accion_1": acciones[0] || '',
    "accion_2": acciones[1] || '',
    "accion_3": acciones[2] || '',
    "accion_4": acciones[3] || '',
    "accion_5": acciones[4] || '',
    "cuando_1": cuandos[0] || '',
    "cuando_2": cuandos[1] || '',
    "cuando_3": cuandos[2] || '',
    "cuando_4": cuandos[3] || '',
    "cuando_5": cuandos[4] || '',
    "persona_1": personas[0] || '',
    "persona_2": personas[1] || '',
    "persona_3": personas[2] || '',
    "persona_4": personas[3] || '',
    "persona_5": personas[4] || '',
    "modo_1": modos[0] || '',
    "modo_2": modos[1] || '',
    "modo_3": modos[2] || '',
    "modo_4": modos[3] || '',
    "modo_5": modos[4] || '',
    "obstaculo_1": obstaculos[0] || '',
    "obstaculo_2": obstaculos[1] || '',
    "obstaculo_3": obstaculos[2] || '',
    "obstaculo_4": obstaculos[3] || '',
    "obstaculo_5": obstaculos[4] || '',
    "como_1": comos[0] || '',
    "como_2": comos[1] || '',
    "como_3": comos[2] || '',
    "como_4": comos[3] || '',
    "como_5": comos[4] || ''
  }
}