import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import useForm from "../../hooks/useForm"
import { inviteUser } from "../../services/workspaceService"

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
        console.log(form_data)
        sendRequest(
            async () => {
                return await inviteUser(form_data.email, workspace_id)
            }
        )
    }

    const { form_state, handleInputChange, handleSubmit} = useForm({initial_form_state: initial_state, onSubmit})
    console.log(response, error, loading)
    if (!isOpen)
        return (
        <button onClick={handleOpenInviteForm}> + Invitar usuario</button>
    )
    else {
        return (
        <form onSubmit={handleSubmit}>
            <input placeholder='ingresa el email del usuario' type='email' name='email' onChange={handleInputChange} />
            {
                error && <span style={{color: 'red'}}>{error.message}</span>
            }
            {
                response && <span style={{color: 'green'}}>{response.message}</span>
            }
            
            <button type='submit' disabled={loading}>Invitar</button> 
            <button type='button' onClick={handleCloseInviteForm}>Cancelar</button>
        </form>
        )
    }

}

export default InviteUserForm