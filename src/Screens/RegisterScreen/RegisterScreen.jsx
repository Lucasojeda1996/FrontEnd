import React from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import './RegisterScreen.css' // CSS que diseñaremos abajo

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

    const { form_state: register_form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: onRegister
    })

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Regístrate</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.NAME}>Nombre:</label>
                        <input
                            id={FORM_FIELDS.NAME}
                            name={FORM_FIELDS.NAME}
                            type="text"
                            placeholder="Tu nombre completo"
                            value={register_form_state.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
                        <input
                            id={FORM_FIELDS.EMAIL}
                            name={FORM_FIELDS.EMAIL}
                            type="email"
                            placeholder="usuario@gmail.com"
                            value={register_form_state.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
                        <input
                            id={FORM_FIELDS.PASSWORD}
                            name={FORM_FIELDS.PASSWORD}
                            type="password"
                            placeholder="********"
                            value={register_form_state.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="primary-button" disabled={loading || response}>
                        {loading ? 'Registrando...' : response ? 'Registrado ✔' : 'Registrarse'}
                    </button>

                    {response && <p className="success-message">{response.message}</p>}
                    {error && <p className="error-message">{error.message}</p>}

                    {!response && (
                        <p className="login-link">
                            ¿Ya tienes una cuenta?{' '}
                            <button
                                type="button"
                                className="form-link-button"
                                onClick={() => navigate('/login')}
                            >
                                Inicia sesión
                            </button>
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
