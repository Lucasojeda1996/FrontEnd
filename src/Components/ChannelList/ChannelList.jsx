import React, { use, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { createNewChannel, getChannelListByWorkspaceId } from '../../services/channelService'
import { Link, useParams } from 'react-router'
import useChannels from '../../hooks/useChannels'
import useForm from '../../hooks/useForm'
import './ChannelList.css'

const NEW_CHANNEL_FORM_FIELDS = {
    CHANNEL_NAME: 'channel_name'
}

const ChannelList = () => {
    const {workspace_id} = useParams()
    const {channels, createChannel} = useChannels()

  


    const initial_new_channel_state = {
        [NEW_CHANNEL_FORM_FIELDS.CHANNEL_NAME]: ''
    }
    const  {form_state, handleInputChange, handleSubmit} = useForm(
        {
            initial_form_state: initial_new_channel_state, 
            onSubmit: createChannel
        }
    )
    console.log({form_state})

    return (
    // 1. Contenedor principal para el scroll
    <div className="channel-list-container"> 
        {/* Lista de canales */}
        {
            channels.map((elemento) => (
                <Link 
                    key={elemento.channel_id} 
                    to={`/workspace/${workspace_id}/${elemento._id}`}
                    // 2. Necesitarías lógica para agregar 'active-channel' 
                    //    si el canal actual coincide con la URL
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
    </div>
)
}

export default ChannelList