import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import { getMessagesByChannel, sendMessage } from "../../services/messageService"


const ChannelMessages = () => {
    const { channel_id } = useParams()
    const { sendRequest, response, loading } = useFetch()
    const [message, setMessage] = useState("")
    const bottomRef = useRef(null)

    // 1. Cargar mensajes cuando cambia el canal
    useEffect(() => {
        if (channel_id) {
            sendRequest(() => getMessagesByChannel(channel_id))
        }
    }, [channel_id])

    // 2. Scroll automático al final
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [response])

    // 3. Enviar mensaje
    const handleSend = async (e) => {
        e.preventDefault()
        if (!message.trim()) return

        await sendRequest(() => sendMessage(channel_id, message))

        setMessage("") // limpiar input
    }

    return (
        <div className="channel-messages-container">
            <h2 className="channel-title">Mensajes del canal</h2>

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

                {/* Punto donde hacemos scroll al final */}
                <div ref={bottomRef} />
            </div>

            {/* Formulario para enviar mensajes */}
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
