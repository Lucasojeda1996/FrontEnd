import React from 'react'
import { useParams } from 'react-router'

const ChannelMessages = () => {
    const { channel_id } = useParams()

    return (
        <div style={{ padding: "20px" }}>
            <h2>Canal seleccionado: {channel_id}</h2>
            <p>Aquí se mostrarán los mensajes del canal.</p>
        </div>
    )
}

export default ChannelMessages
