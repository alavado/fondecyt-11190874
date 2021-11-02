import axios from 'axios'

const apiRoot = 'https://tmb-fondecyt.herokuapp.com/api'

export const login = (email, password) => {
  const url = `${apiRoot}/login`
  return axios.post(
    url,
    JSON.stringify({ user: { email, password } }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const statusPacienteActivo = 8

export const pacientes = jwt => () => {
  const url = `${apiRoot}/patients`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const paciente = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const assist = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}/assist`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const audit = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}/audit`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const antecedentes = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}/antecedente`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const tlfb = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}/resumentlfb`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const obtenerPlanDeCambio = (jwt, id) => () => {
  const url = `${apiRoot}/patients/${id}/plans`
  return axios.get(
    url,
    {
      headers: {
        'Authorization': jwt
      }
    }
  )
}

export const agregarPlanDeCambio = (jwt, id, datos) => () => {
  const url = `${apiRoot}/patients/${id}/plans`
  return axios.post(
    url,
    JSON.stringify(datos),
    {
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const actualizarPlanDeCambio = (jwt, idPaciente, idPlan, datos) => () => {
  const url = `${apiRoot}/patients/${idPaciente}/plans/${idPlan}`
  return axios.patch(
    url,
    JSON.stringify(datos),
    {
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    }
  )
}