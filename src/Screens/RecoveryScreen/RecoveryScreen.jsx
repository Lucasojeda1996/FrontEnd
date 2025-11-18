import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm.jsx'
import useFetch from '../../hooks/useFetch.jsx'
import { sendRecoveryEmail } from '../../services/authService.js'
import { useNavigate } from 'react-router'
import './RecoveryScreen.css'

const FORM_FIELDS = {
  EMAIL: 'email'
}

const initial_form_state = {
  [FORM_FIELDS.EMAIL]: ''
}

const RecoveryScreen = () => {
  const navigate = useNavigate()

  const { sendRequest, loading, response, error } = useFetch()

  const onSubmit = (form_state) => {
    sendRequest(() => sendRecoveryEmail(form_state[FORM_FIELDS.EMAIL]))
  }

  const { handleSubmit, handleInputChange } = useForm({ initial_form_state, onSubmit })

  // ⭐ Redirección automática cuando el correo se envió correctamente
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        navigate('/login')
      }, 2000) // 2 segundos para que el usuario vea el mensaje

      return () => clearTimeout(timer)
    }
  }, [response, navigate])

  return (
    <div className='recovery-page-container'>
      <div className='recovery-card'>
        <h1>Recuperar contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor={FORM_FIELDS.EMAIL}>Correo electrónico</label>
            <input
              id={FORM_FIELDS.EMAIL}
              name={FORM_FIELDS.EMAIL}
              type='email'
              placeholder='Ej: usuario@gmail.com'
              onChange={handleInputChange}
              required
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? 'Enviando correo...' : 'Enviar enlace de recuperación'}
          </button>

          {response && <p className='success-message'>{response.message}</p>}
          {error && <p className='error-message'>{error.message}</p>}
        </form>
      </div>
    </div>
  )
}

export default RecoveryScreen
