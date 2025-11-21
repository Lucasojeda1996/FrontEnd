import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { createNewChannel, getChannelListByWorkspaceId } from '../../services/channelService'
import { Link, useParams, useNavigate } from 'react-router'
import useChannels from '../../hooks/useChannels'
import useForm from '../../hooks/useForm'
import './ChannelList.css'

const NEW_CHANNEL_FORM_FIELDS = {
    CHANNEL_NAME: 'channel_name'
}

const ChannelList = () => {
    const {workspace_id} = useParams()
    const {channels, createChannel} = useChannels()
    const navigate = useNavigate()

    // 🔹 Estado para abrir/cerrar modal Invitar Miembro
    const [openInvite, setOpenInvite] = useState(false)

    const initial_new_channel_state = {
        [NEW_CHANNEL_FORM_FIELDS.CHANNEL_NAME]: ''
    }

    const  {form_state, handleInputChange, handleSubmit} = useForm(
        {
            initial_form_state: initial_new_channel_state, 
            onSubmit: createChannel
        }
    )

    return (
    <div className="channel-list-container"> 
        
        {/* Lista de canales */}
        {
            channels.map((elemento) => (
                <Link 
                    key={elemento._id} 
                    to={`/workspace/${workspace_id}/${elemento._id}`}
                >
                    {elemento.name}
                </Link>
            ))
        }
        
        {/* Formulario de creación */}
        <form onSubmit={handleSubmit} className="new-channel-form"> 
            <div>
                <label htmlFor="channel_name">Nombre del canal</label>
                <input 
                    type="text" 
                    placeholder='ej: general' 
                    id='channel_name' 
                    name='channel_name' 
                    onChange={handleInputChange}
                    value={form_state[NEW_CHANNEL_FORM_FIELDS.CHANNEL_NAME]}
                />
            </div>
            <button type='submit'>Crear Canal</button>
        </form>

        {/* 🔹 Botón Invitar Miembro */}
        <button 
            className="invite-member-btn"
            onClick={() => setOpenInvite(true)}
        >
            Invitar Miembro
        </button>

        {/* 🔹 Botón Volver al Home */}
        <button 
            className="home-btn"
            onClick={() => navigate("/home")}
        >
            Volver al Home
        </button>



    </div>
    )
}

export default ChannelList
