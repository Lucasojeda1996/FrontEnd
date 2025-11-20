import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceById } from '../../services/workspaceService'
import InviteUserForm from '../../Components/InviteUserForm/InviteUserForm'
import ChannelList from '../../Components/ChannelList/ChannelList'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
    const { workspace_id} = useParams()

    const { sendRequest, response, error, loading } = useFetch()
    useEffect(
        () => {
            sendRequest(
                async () => {
                    return await getWorkspaceById(workspace_id)
                }
            )
        },
        [workspace_id]
    )




    return (
        <div className="workspace-detail-container">
            {/* BARRA LATERAL DE CANALES */}
            <div className="channel-sidebar">
                {/* Título/Encabezado del Workspace */}
                {response && (
                    <h1 className="workspace-header">
                        {response.data.workspace.name}
                    </h1>
                )}
                
                {/* Componente de Lista de Canales */}
                {workspace_id && <ChannelList />}
            </div>

            {/* ÁREA DE CONTENIDO PRINCIPAL */}
            <div className="main-content-area">
                
                {/* Formulario de Invitación */}
                <div className="invite-form-container">
                    <InviteUserForm workspace_id={workspace_id} />
                </div>
                
                {/* Aquí iría el área de chat (si existiera) o más contenido */}
                {loading && <p>Cargando información del workspace...</p>}
                {error && <p className="error-message">Error al cargar: {error.message}</p>}
                
            </div>
        </div>
    )
}

export default WorkspaceDetailScreen