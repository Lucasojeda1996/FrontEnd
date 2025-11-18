import React, { use, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { createNewChannel, getChannelListByWorkspaceId } from '../../services/channelService'
import { Link, useParams } from 'react-router'
import useChannels from '../../hooks/useChannels'
import useForm from '../../hooks/useForm'

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
        <div style={{display: 'flex', flexDirection:"column"}}>
            {
                channels.map((elemento) => {
                    return (
                        <Link key={elemento.channel_id} to={`/workspace/${workspace_id}/${elemento._id}`}>{elemento.name}</Link>
                    )
                })
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="channel_name">Nombre del canal:</label>
                    <input 
                        type="text" 
                        placeholder='Nuevo canal' 
                        id='channel_name' 
                        name='channel_name' 
                        onChange={handleInputChange}
                        value={form_state[NEW_CHANNEL_FORM_FIELDS.CHANNEL_NAME]}
                    />
                </div>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default ChannelList