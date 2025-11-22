import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import useForm from "../../hooks/useForm"
import { inviteUser } from "../../services/workspaceService"
import './InviteUserForm.css' // Importamos el CSS

function InviteUserForm({ workspace_id }) {
    const [isOpen, setIsOpen] = useState(false)

    function handleOpenInviteForm() {
        setIsOpen(true)
    }
    function handleCloseInviteForm() {
        setIsOpen(false)
    }

    const {sendRequest, response, error, loading} = useFetch()

    const initial_state = {
        email: ''
    }
    const onSubmit = (form_data) => {
        sendRequest(
            async () => {
                return await inviteUser(form_data.email, workspace_id)
            }
        )
    }

    const { form_state, handleInputChange, handleSubmit} = useForm({initial_form_state: initial_state, onSubmit})

    // 1. Botón para abrir el modal (se muestra si el modal está cerrado)
    if (!isOpen)
        return (
        <button className="invite-button" onClick={handleOpenInviteForm}>
             + Invitar usuario
        </button>
    )

    // 2. Estructura del Modal (se muestra si isOpen es true)
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Invitar usuario al Workspace</h2>
                <form className="invite-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email del invitado:</label>
                        <input 
                            placeholder='ej: usuario@dominio.com' 
                            type='email' 
                            name='email' 
                            onChange={handleInputChange} 
                            value={form_state.email}
                            required
                        />
                    </div>
                    
                    {error && <span className="error-message">{error.message}</span>}
                    {response && <span className="success-message">{response.message}</span>}
                    
                    <div className="button-group">
                        <button type='submit' className="primary-button" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar Invitación'}
                        </button> 
                        <button type='button' className="secondary-button" onClick={handleCloseInviteForm}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InviteUserForm