import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../helpers/api'
import { guardaToken } from '../../redux/ducks/login'
import logoColor from '../../assets/TMB Color-02.svg'
import './Login.css'
import { useMutation } from 'react-query'

const Login = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { mutate, isLoading, isError } = useMutation(({ email, password }) => login(email, password), {
    onSuccess: data => {
      const { authorization: token } = data.headers
      dispatch(guardaToken(token))
    }
  })

  return (
    <div className="Login">
      <form className="Login__formulario" onSubmit={handleSubmit(mutate)} >
        <img src={logoColor} className="Login__logo" alt="Logo TMB" />
        <div className="Login__contenedor_campos">
          <div className="Login__contenedor_campo">
            <label htmlFor="email">E-mail</label>
            <input {...register('email')} required={true} />
            {errors.usuarioRequired && <span>Este campo es necesario</span>}
          </div>
          <div className="Login__contenedor_campo">
            <label htmlFor="password">Contraseña</label>
            <input type="password" {...register('password')} required={true} />
            {errors.passwordRequired && <span>Este campo es necesario</span>}
          </div>
          <button
            className="Login__boton"
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? 'Ingresar' : 'Ingresando...'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login