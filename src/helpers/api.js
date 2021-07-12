import axios from 'axios'

const apiRoot = 'https://tmb-fondecyt.herokuapp.com/api/'

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