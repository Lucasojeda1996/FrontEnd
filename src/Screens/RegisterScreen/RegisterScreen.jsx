import React from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate() // ✅ Necesario para usar navigate('/login')

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
    <div>
      <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            name="name"
            id="name"
            type="text"
            value={register_form_state.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            type="email"
            value={register_form_state.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            name="password"
            id="password"
            type="password"
            value={register_form_state.password}
            onChange={handleInputChange}
          />
        </div>

        {!response ? (
          <button type="submit" disabled={loading}>
            Registrarse
          </button>
        ) : (
          <>
            <button type="submit" disabled>
              Registrado
            </button>
            <span style={{ color: 'green' }}>{response.message}</span>
            <button type="button" onClick={() => navigate('/login')}>
              Ir al login
            </button>
          </>
        )}

        {error && <span style={{ color: 'red' }}>{error.message}</span>}
      </form>
    </div>
  )
}

export default RegisterScreen
