import React from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import './RegisterScreen.css'

const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password'
}

const initial_form_state = {
  [FORM_FIELDS.NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
}

const RegisterScreen = () => {
  const navigate = useNavigate()
  const { sendRequest, loading, response, error } = useFetch()

  const onRegister = (form_state) => {
    sendRequest(() =>
      register(
        form_state[FORM_FIELDS.NAME],
        form_state[FORM_FIELDS.EMAIL],
        form_state[FORM_FIELDS.PASSWORD]
      )
    )
  }

  const { form_state: register_form_state, handleInputChange, handleSubmit } =
    useForm({ initial_form_state, onSubmit: onRegister })

  return (
    <div className='register-page-container'>
      <div className='register-card'>
        <h1>Crear cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='name'>Nombre</label>
            <input
              name='name'
              id='name'
              type='text'
              value={register_form_state.name}
              onChange={handleInputChange}
              placeholder='Tu nombre completo'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='email'>Correo electrónico</label>
            <input
              name='email'
              id='email'
              type='email'
              value={register_form_state.email}
              onChange={handleInputChange}
              placeholder='usuario@gmail.com'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Contraseña</label>
            <input
              name='password'
              id='password'
              type='password'
              value={register_form_state.password}
              onChange={handleInputChange}
              placeholder='********'
              required
            />
          </div>

          {!response ? (
            <button type='submit' disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          ) : (
            <>
              <button type='submit' disabled>
                Registrado ✔
              </button>
              <p className='success-message'>{response.message}</p>
              <button
                type='button'
                className='secondary-button'
                onClick={() => navigate('/login')}
              >
                Ir al login
              </button>
            </>
          )}

          {error && <p className='error-message'>{error.message}</p>}
        </form>
      </div>
    </div>
  )
}

export default RegisterScreen
