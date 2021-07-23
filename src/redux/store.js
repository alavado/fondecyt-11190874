import { createStore } from '@reduxjs/toolkit'
import rootReducer from './ducks/index'

const store = createStore(rootReducer)

export default store