import { useForm } from 'react-hook-form'
import { login } from '../../helpers/api'
import './Login.css'

const Login = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const ingresar = ({ email, password }) => {
    login(email, password)
      .then(res => console.log(res.headers))
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(ingresar)} >
        <div className="Login__contenedor_campo">
          <label htmlFor="email">email</label>
          <input {...register('email')} required={true} />
          {errors.usuarioRequired && <span>Este campo es necesario</span>}
        </div>
        <div className="Login__contenedor_campo">
          <label htmlFor="password">Contraseña</label>
          <input {...register('password')} required={true} />
          {errors.passwordRequired && <span>Este campo es necesario</span>}
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login