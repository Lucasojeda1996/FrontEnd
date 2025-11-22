import React, { useEffect, useState } from 'react' // Importamos useState
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceById } from '../../services/workspaceService'
import InviteUserForm from '../../Components/InviteUserForm/InviteUserForm'
import ChannelList from '../../Components/ChannelList/ChannelList'
import ChannelMessages from '../../Components/ChannelMessages/ChannelMessages'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const { sendRequest, response, error, loading } = useFetch()

    // ⭐ NUEVO ESTADO: Controla si la sidebar está abierta en móviles
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // ⭐ NUEVA FUNCIÓN: Alterna el estado del sidebar
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    // ⭐ EFECTO ADICIONAL: Cierra el sidebar automáticamente al seleccionar un canal en móvil
    useEffect(() => {
        if (channel_id && isSidebarOpen) {
            // Asegúrate de que esto solo se ejecute en móvil si es necesario
            // Si el canal cambia y el sidebar está abierto, lo cerramos
            setIsSidebarOpen(false) 
        }
    }, [channel_id])

    // Aplicamos la clase dinámica 'sidebar-open' al contenedor principal
    const containerClass = `workspace-detail-container ${isSidebarOpen ? 'sidebar-open' : ''}`

    return (
        <div className={containerClass}>
            
            {/* ⭐ BOTÓN HAMBURGUESA: Visible solo en pantallas pequeñas */}
            <button 
                className="hamburger-button" 
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? '✕' : '☰'} 
            </button>

            {/* Sidebar izquierda */}
            <div className="channel-sidebar">
                {response && (
                    <h1 className="workspace-header">
                        {response.data.workspace.name}
                    </h1>
                )}
                {/* Asegúrate de que ChannelList también pueda recibir una prop para manejar el cierre si es necesario */}
                <ChannelList />
                <div className="invite-form-container">
                    <InviteUserForm workspace_id={workspace_id} />
                </div>
            </div>
            
            {/* Área de Contenido Principal */}
            <div className="main-content-area">
                {channel_id ? (
                    <ChannelMessages />
                ) : (
                    <p>👉 Selecciona un canal para ver los mensajes</p>
                )}
            </div>
        </div>
    )
}

export default WorkspaceDetailScreen