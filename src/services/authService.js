import ENVIRONMENT from "../config/environment"
import {CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"

export async function register(name,email,password) {
    const usuario ={ 
        name,
        email,
        password
    }
const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/auth/register` ,{
            method: HTTP_METHODS.POST,
            headers: {
                //Como vamos a enviar JSON, configuro que mi consulta envia contenido tipo JSON
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify(usuario)
        }
      )
const response_data = await response_http .json()
if(!response_data.ok){
    throw new Error (response_data.message)
}
return response_data 
}

export async function login(email, password) {
    const response = await fetch(
    `${ENVIRONMENT.URL_API}/api/auth/login`   ,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ email, password })
        })
    const response_data = await response.json()

    if (!response.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}

export async function sendRecoveryEmail(email) {
  const response = await fetch(
    `${ENVIRONMENT.URL_API}/api/auth/recovery`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }
  )
  return response.json()
}

export async function resetPassword(recovery_token, new_password) {
  const response = await fetch(
    `${ENVIRONMENT.URL_API}/api/auth/reset-password/${recovery_token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_password })
    }
  );

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("El servidor no devolvió una respuesta válida");
  }
}