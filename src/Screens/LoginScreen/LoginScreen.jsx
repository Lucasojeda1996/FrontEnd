import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import { login } from '../../services/authService.js'
import { useNavigate } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstorage.js'
import './Loginscreen.css'

const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

const initial_form_state = {
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}

export const LoginScreen = () => {
  const navigate = useNavigate()
  const { sendRequest, loading, response, error } = useFetch()

  const onLogin = (form_state) => {
    sendRequest(() =>
      login(
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    )
  }

  useEffect(() => {
    if (response && response.ok) {
      localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
      navigate('/home')
    }
  }, [response])

  const { form_state: login_form_state, handleSubmit, handleInputChange } = useForm({
    initial_form_state,
    onSubmit: onLogin
  })

  const goToRegister = () => navigate('/register')
  const goToRecovery = () => navigate('/recovery')

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={FORM_FIELDS.EMAIL} className="form-label">Email</label>
            <input
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type="email"
              className="form-input"
              value={login_form_state[FORM_FIELDS.EMAIL]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={FORM_FIELDS.PASSWORD} className="form-label">Contraseña</label>
            <input
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              type="password"
              className="form-input"
              value={login_form_state[FORM_FIELDS.PASSWORD]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-button-container">
            {!response ? (
              <button
                type="submit"
                className="form-button"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            ) : (
              <button
                type="submit"
                className="form-button success"
                disabled
              >
                Sesión Iniciada
              </button>
            )}

            {response && <span className="form-message success">{response.message}</span>}
            {error && <span className="form-message error">{error.message}</span>}
          </div>

          <div className="form-links">
            <button
              type="button"
              className="form-link-button"
              onClick={goToRegister}
            >
              ¿No tienes una cuenta? Regístrate aquí
            </button>

            <button
              type="button"
              className="form-link-button"
              onClick={goToRecovery}
            >
              ¿Olvidaste tu contraseña? Recupérala aquí
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
