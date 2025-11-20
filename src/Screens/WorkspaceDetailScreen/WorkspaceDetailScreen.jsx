import React, { useEffect } from 'react'
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

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    return (
        <div className="workspace-detail-container">

            {/* Sidebar izquierda */}
            <div className="channel-sidebar">
                {response && (
                    <h1 className="workspace-header">
                        {response.data.workspace.name}
                    </h1>
                )}

                <ChannelList />
            </div>

            {/* Contenido principal */}
            <div className="main-content-area">

                {channel_id ? (
                    <ChannelMessages />
                ) : (
                    <p>👉 Selecciona un canal para ver los mensajes</p>
                )}

                <div className="invite-form-container">
                    <InviteUserForm workspace_id={workspace_id} />
                </div>

            </div>
        </div>
    )
}

export default WorkspaceDetailScreen
