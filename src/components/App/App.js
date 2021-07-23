import { useSelector } from 'react-redux'
import Dashboard from '../Dashboard'
import Login from '../Login'
import './App.css'

const App = () => {

  const { exp } = useSelector(state => state.login)

  console.log(exp)

  return (
    <div className="App">
      {/* <img src={logo} alt="Logo TMB" /> */}
      <Login />
      {/* <Dashboard /> */}
    </div>
  )
}

export default App
