import React from 'react'
import useForm from '../../hooks/useForm.jsx'
import useFetch from '../../hooks/useFetch.jsx'
import { sendRecoveryEmail } from '../../services/authService.js'

const FORM_FIELDS = {
  EMAIL: 'email'
}

const initial_form_state = {
  [FORM_FIELDS.EMAIL]: ''
}

const RecoveryScreen = () => {
  const { sendRequest, loading, response, error } = useFetch()

  const onSubmit = (form_state) => {
    sendRequest(() => sendRecoveryEmail(form_state[FORM_FIELDS.EMAIL]))
  }

  const { handleSubmit, handleInputChange } = useForm({ initial_form_state, onSubmit })

  return (
    <div>
      <h1>Recuperar contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
          <input
            id={FORM_FIELDS.EMAIL}
            name={FORM_FIELDS.EMAIL}
            type='email'
            onChange={handleInputChange}
          />
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'Enviando correo...' : 'Enviar enlace de recuperación'}
        </button>

        {response && <p style={{ color: 'green' }}>{response.message}</p>}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  )
}

export default RecoveryScreen
