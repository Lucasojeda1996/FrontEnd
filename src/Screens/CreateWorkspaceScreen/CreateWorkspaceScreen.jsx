import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { createWorkspace } from '../../services/workspaceService'
import { useNavigate } from 'react-router'

const CreateWorkspaceScreen = () => {
    const navigation = useNavigate()
    const {response, loading, error, sendRequest} = useFetch()
    const initial_state = { workspace_name:'',url_image: '' }
    const onSubmit = (form_data) => {
        sendRequest(
            async () => {
                return await createWorkspace(form_data.workspace_name,form_data.url_image)
            }
        )
    }
    
    useEffect(()=> { if(response && response.ok){navigation('/home')} }, [response])
    const {  form_state,  handleInputChange, handleSubmit  } = useForm({
        initial_form_state: initial_state,
        onSubmit: onSubmit
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="workspace_name">Nombre del espacio de trabajo</label>
                    <input type="text" name="workspace_name" id="workspace_name" value={form_state.workspace_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="url_image">Imagen del workspace (URL)</label>
                    <input type="text" name="url_image" id="url_image" value={form_state.url_image} onChange={handleInputChange}
                    />
                </div>
                {
                    error && <span style={{color: 'red'}}>{error.message}</span>
                }
                <button>Crear espacio de trabajo</button>
            </form>
        </div>
    )
}

export default CreateWorkspaceScreen