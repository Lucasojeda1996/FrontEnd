import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { register } from '../../services/authService'
import './RegisterScreen.css' // tu archivo CSS

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

    const { form_state: register_form_state, handleSubmit, handleInputChange } =
        useForm({
            initial_form_state,
            onSubmit: onRegister
        })

    // Redirigir al login cuando el registro sea exitoso
    useEffect(() => {
        if (response && response.ok) {
            const timer = setTimeout(() => {
                navigate('/login')
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [response, navigate])

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Registrate</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.NAME}>Nombre:</label>
                        <input
                            type="text"
                            name={FORM_FIELDS.NAME}
                            id={FORM_FIELDS.NAME}
                            value={register_form_state[FORM_FIELDS.NAME]}
                            onChange={handleInputChange}
                            placeholder="Tu nombre completo"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
                        <input
                            type="email"
                            name={FORM_FIELDS.EMAIL}
                            id={FORM_FIELDS.EMAIL}
                            value={register_form_state[FORM_FIELDS.EMAIL]}
                            onChange={handleInputChange}
                            placeholder="usuario@gmail.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
                        <input
                            type="password"
                            name={FORM_FIELDS.PASSWORD}
                            id={FORM_FIELDS.PASSWORD}
                            value={register_form_state[FORM_FIELDS.PASSWORD]}
                            onChange={handleInputChange}
                            placeholder="********"
                            required
                        />
                    </div>

                    {!response ? (
                        <button type="submit" className="primary-button" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    ) : (
                        <>
                            <button type="submit" className="primary-button" disabled>
                                Registrado ✔
                            </button>
                            <p className="success-message">
                                {response.message} Redirigiendo al login...
                            </p>
                        </>
                    )}

                    {error && <p className="error-message">{error.message}</p>}
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
