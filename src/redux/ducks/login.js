import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const slice = createSlice({
  name: 'login',
  initialState: {
    jwt: undefined,
    exp: undefined
  },
  reducers: {
    guardaToken(state, token) {
      state.jwt = token
      state.exp = jwtDecode(token).exp
    }
  }
})

export const {
  guardaToken
} = slice.actions

export default slice.reducer