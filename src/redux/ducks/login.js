import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const slice = createSlice({
  name: 'login',
  initialState: {
    jwt: undefined,
    exp: undefined
  },
  reducers: {
    guardaToken(state, action) {
      const token = action.payload
      state.jwt = token
      state.exp = jwtDecode(token).exp
    },
    borraToken(state) {
      state.jwt = undefined
      state.exp = undefined
    }
  }
})

export const {
  guardaToken,
  borraToken
} = slice.actions

export default slice.reducer