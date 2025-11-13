import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
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

  const {
    form_state: register_form_state,
    handleSubmit,
    handleInputChange
  } = useForm({
    initial_form_state,
    onSubmit: onRegister
  })

  return (
    <div className='register-container'>
      <div className='register-card'>
        <h1 className='register-title'>Crear cuenta</h1>

        <form onSubmit={handleSubmit} className='register-form'>
          <div className='input-group'>
            <label htmlFor={FORM_FIELDS.NAME} className='form-label'>
              Nombre:
            </label>
            <input
              name={FORM_FIELDS.NAME}
              id={FORM_FIELDS.NAME}
              type='text'
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.NAME]}
              className='form-input'
              placeholder='Tu nombre completo'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor={FORM_FIELDS.EMAIL} className='form-label'>
              Email:
            </label>
            <input
              name={FORM_FIELDS.EMAIL}
              id={FORM_FIELDS.EMAIL}
              type='email'
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.EMAIL]}
              className='form-input'
              placeholder='usuario@gmail.com'
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor={FORM_FIELDS.PASSWORD} className='form-label'>
              Contraseña:
            </label>
            <input
              name={FORM_FIELDS.PASSWORD}
              id={FORM_FIELDS.PASSWORD}
              type='password'
              onChange={handleInputChange}
              value={register_form_state[FORM_FIELDS.PASSWORD]}
              className='form-input'
              placeholder='********'
              required
            />
          </div>

          {!response ? (
            <button
              type='submit'
              disabled={loading}
              className='primary-button'
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          ) : (
            <>
              <button type='button' disabled className='primary-button success'>
                Registrado ✔
              </button>
              <p className='success-message'>{response.message}</p>
            </>
          )}

          {error && <p className='error-message'>{error.message}</p>}
        </form>

        {/* Botón de enlace al login */}
        {!response && (
          <div className='link-container'>
            <span>¿Ya tienes una cuenta?</span>
            <button
              type='button'
              className='link-button'
              onClick={() => navigate('/login')}
            >
              Inicia sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegisterScreen
