import React, { useState, useEffect } from 'react' // Se añaden hooks de React para los mocks
// import useForm from '../../hooks/useForm' // ORIGINAL - Descomentar en tu proyecto
// import { register } from '../../services/authService' // ORIGINAL - Descomentar en tu proyecto
// import useFetch from '../../hooks/useFetch' // ORIGINAL - Descomentar en tu proyecto
import { useNavigate } from 'react-router'
import './RegisterScreen.css' // Se mantiene la importación del CSS

// --- MOCKS para Entorno de Vista Previa (ELIMINAR en tu proyecto real) ---
// Simulación de useForm
const useForm = ({ initial_form_state, onSubmit }) => {
    const [formState, setFormState] = useState(initial_form_state);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formState);
    };
    return { form_state: formState, handleInputChange, handleSubmit };
};

// Simulación de useFetch
const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const sendRequest = (apiCall) => {
        setLoading(true);
        setResponse(null);
        setError(null);
        // Simular llamada a la API con un retraso
        setTimeout(() => {
            // Asume éxito para la previsualización
            setResponse({ ok: true, message: "¡Cuenta creada con éxito! Redirigiendo..." });
            setLoading(false);
        }, 1500);
    };
    return { sendRequest, loading, response, error };
};

// Simulación de register
const register = (name, email, password) => {
    console.log("Mock Register:", { name, email, password });
    return new Promise(resolve => resolve({ success: true }));
};
// --- FIN MOCKS ---


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

  // Efecto para simular la redirección tras el registro exitoso
  useEffect(() => {
      if (response && response.ok) {
          const timer = setTimeout(() => {
              navigate('/login'); // Redirige al login
          }, 2000);
          return () => clearTimeout(timer);
      }
  }, [response, navigate]);


  const { form_state: register_form_state, handleInputChange, handleSubmit } =
    useForm({ initial_form_state, onSubmit: onRegister })

  return (
    <div className='register-page-container'>
      <div className='register-card'>
        
        {/* Título de la pantalla de registro */}
        <h1 className='register-title'>Crear cuenta</h1>

        <form onSubmit={handleSubmit} className='register-form'>
          
            {/* Campo Nombre */}
            <div className='input-group'>
            <label htmlFor='name' className='form-label'>Nombre</label>
            <input
                className='form-input'
              name='name'
              id='name'
              type='text'
              value={register_form_state[FORM_FIELDS.NAME]}
              onChange={handleInputChange}
              placeholder='Tu nombre completo'
              required
            />
          </div>

            {/* Campo Email */}
          <div className='input-group'>
            <label htmlFor='email' className='form-label'>Correo electrónico</label>
            <input
                className='form-input'
              name='email'
              id='email'
              type='email'
              value={register_form_state[FORM_FIELDS.EMAIL]}
              onChange={handleInputChange}
              placeholder='usuario@gmail.com'
              required
            />
          </div>

            {/* Campo Contraseña */}
          <div className='input-group'>
            <label htmlFor='password' className='form-label'>Contraseña</label>
            <input
                className='form-input'
              name='password'
              id='password'
              type='password'
              value={register_form_state[FORM_FIELDS.PASSWORD]}
              onChange={handleInputChange}
              placeholder='********'
              required
            />
          </div>

          {!response ? (
            <button type='submit' disabled={loading} className='primary-button'>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          ) : (
            <>
              <button type='button' disabled className='primary-button success'>
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
        {/* Enlace para ir al login si no hay respuesta de éxito y sin usar botón */}
        { !response && 
            <p className='login-link-container'>
                ¿Ya tienes una cuenta?
                <button 
                    type='button' 
                    className='form-link-button'
                    onClick={() => navigate('/login')}
                >
                    Inicia sesión aquí
                </button>
            </p>
        }
      </div>
            <div className='flex items-center justify-center p-4 bg-gray-100 min-h-screen'>
            </div>
    </div>
  )
}

export default RegisterScreen