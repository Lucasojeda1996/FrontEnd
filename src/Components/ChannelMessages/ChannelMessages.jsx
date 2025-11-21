import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { getChannelMessages, sendMessage } from "../../services/messageService"
import './ChannelMessages.css'

const ChannelMessages = ({ channels }) => {
    const { workspace_id, channel_id } = useParams()
    const { sendRequest, response, loading } = useFetch()
    const [message, setMessage] = useState("")
    const bottomRef = useRef(null)

    // Buscar el canal actual por ID
    const currentChannel = channels?.find(
        (c) => c._id === channel_id || c.channel_id === channel_id
    )

    // Cargar mensajes del canal
    useEffect(() => {
        if (workspace_id && channel_id) {
            sendRequest(() => getChannelMessages(workspace_id, channel_id))
        }
    }, [workspace_id, channel_id])

    // Scroll automático al final
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [response])

    // Enviar mensaje
    const handleSend = async (e) => {
        e.preventDefault()
        if (!message.trim()) return
        
        await sendRequest(() => sendMessage(workspace_id, channel_id, message))
        
        setMessage("")
        
        // Recargar mensajes después de enviar
        sendRequest(() => getChannelMessages(workspace_id, channel_id))
    }

    return (
        <div className="channel-messages-container">

            {/* ⭐ NOMBRE DEL CANAL AQUÍ */}
            <h2>
                {currentChannel ? `# ${currentChannel.name}` : "Cargando canal..."}
            </h2>

            <div className="messages-list">
                {loading && <p>Cargando mensajes...</p>}

                {response?.data?.messages?.map((msg) => (
                    <div key={msg._id} className="message-bubble">
                        <strong>{msg.member?.user?.name}</strong>
                        <p>{msg.content}</p>
                        <span className="timestamp">
                            {new Date(msg.created_at).toLocaleTimeString()}
                        </span>
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>

            <form className="message-form" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default ChannelMessages
