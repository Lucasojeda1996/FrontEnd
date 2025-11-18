import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm.jsx'
import useFetch from '../../hooks/useFetch.jsx'
import { resetPassword } from '../../services/authService.js'

const FORM_FIELDS = {
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirm_password'
}

const initial_form_state = {
  [FORM_FIELDS.PASSWORD]: '',
  [FORM_FIELDS.CONFIRM_PASSWORD]: ''
}

const ResetPasswordScreen = () => {
  const { recovery_token } = useParams()
  const navigate = useNavigate()
  const { sendRequest, loading, response, error } = useFetch()

  const onSubmit = (form_state) => {
    if (form_state[FORM_FIELDS.PASSWORD] !== form_state[FORM_FIELDS.CONFIRM_PASSWORD]) {
      alert('Las contraseñas no coinciden')
      return
    }

    sendRequest(() =>
      resetPassword(recovery_token, form_state[FORM_FIELDS.PASSWORD])
    )
  }

  const { handleSubmit, handleInputChange } = useForm({
    initial_form_state,
    onSubmit
  })

  // ⭐ Redirección automática al login cuando la contraseña fue cambiada exitosamente
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        navigate('/login')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [response, navigate])

  return (
    <div>
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={FORM_FIELDS.PASSWORD}>Nueva Contraseña:</label>
          <input
            id={FORM_FIELDS.PASSWORD}
            name={FORM_FIELDS.PASSWORD}
            type='password'
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.CONFIRM_PASSWORD}>Confirmar Contraseña:</label>
          <input
            id={FORM_FIELDS.CONFIRM_PASSWORD}
            name={FORM_FIELDS.CONFIRM_PASSWORD}
            type='password'
            onChange={handleInputChange}
            required
          />
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'Restableciendo...' : 'Cambiar Contraseña'}
        </button>

        {response && (
          <p style={{ color: 'green' }}>{response.message} (redirigiendo...)</p>
        )}

        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  )
}

export default ResetPasswordScreen
