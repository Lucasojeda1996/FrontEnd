import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import { login } from '../../services/authService.js'
import { useNavigate } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstorage.js'
import './LoginScreen.css' 
const FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'

}
const initial_form_state = {
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: ''
}
 const LoginScreen = () => {
    const navigate = useNavigate()
    const { sendRequest, loading, response, error } = useFetch()
    const onLogin = (form_state) => {
        sendRequest(() => login(
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        ))
    }
    useEffect(() => {
        console.log(response)
        if (response && response.ok) {
            //Guardamos el token emitido por el backend, para despues usarlo como credencial
            localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
            navigate('/home')
        }
    },
        [response]
    )
    const { form_state: login_form_state, handleSubmit, handleInputChange } = useForm({ initial_form_state, onSubmit: onLogin }
    )
    const goToRegister = () => { navigate('/register') }
    const goToRecovery = () => navigate('/recovery')
    return (
       <div className="auth-container">
  <div className="auth-card">
    <h1>Iniciar Sesión</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
        <input name={FORM_FIELDS.EMAIL} id={FORM_FIELDS.EMAIL} type="email" onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
        <input name={FORM_FIELDS.PASSWORD} id={FORM_FIELDS.PASSWORD} type="password" onChange={handleInputChange} />
      </div>
      {!response ? (
        <button type="submit" disabled={loading} className="primary-button">
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      ) : (
        <>
          <button type="submit" disabled className="primary-button">Sesión Iniciada</button>
          <span className="success-message">{response.message}</span>
        </>
      )}
      {error && <span className="error-message">{error.message}</span>}

      <p className="auth-link-container">
        ¿No tienes una cuenta?
        <button type="button" onClick={goToRegister} className="auth-link-button">Registrate aquí</button>
      </p>
      <p className="auth-link-container">
        ¿Olvidaste tu contraseña?
        <button type="button" onClick={goToRecovery} className="auth-link-button">Recupérala aquí</button>
      </p>
    </form>
  </div>
</div>
    )
}
export default LoginScreen