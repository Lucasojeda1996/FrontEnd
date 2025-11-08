import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'

// 🟢 Primero definís FORM_FIELDS
const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password'
};

// 🟢 Luego definís initial_form_state
const initial_form_state = {
  [FORM_FIELDS.NAME]: '',
  [FORM_FIELDS.EMAIL]: '',
  [FORM_FIELDS.PASSWORD]: ''
};


const RegisterScreen = () => {

const{sendRequest,loading,response,error}=useFetch()

const onRegister = (form_state) => {
sendRequest(()=> register(
  form_state[FORM_FIELDS.NAME],
  form_state[FORM_FIELDS.EMAIL],
  form_state[FORM_FIELDS.PASSWORD]
))
} 
const {form_state: register_form_state ,handleInputChange,handleSubmit } = useForm({initial_form_state,onSubmit:onRegister})

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
     {
       !response
       ? <button type='submit' disabled={loading}>Registrarse</button>
        : <>
      <button type='submit' disabled={true}>Registrado</button>
      <span style={{color: 'green'}}>{response.message}</span>
     </>
                }
                {
                    error && <span style={{color: 'red'}}>{error.message}</span>
                }
      </form>
    </div>
  )
}

export default RegisterScreen
