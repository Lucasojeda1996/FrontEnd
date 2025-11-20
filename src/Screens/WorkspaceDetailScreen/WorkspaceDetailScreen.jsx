import React, { useEffect } from 'react'
import { useParams, Routes, Route } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceById } from '../../services/workspaceService'
import InviteUserForm from '../../Components/InviteUserForm/InviteUserForm'
import ChannelList from '../../Components/ChannelList/ChannelList'
import ChannelMessages from '../../Components/ChannelMessages/ChannelMessages'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
    const { workspace_id } = useParams()

    const { sendRequest, response, error, loading } = useFetch()

    useEffect(() => {
        sendRequest(() => getWorkspaceById(workspace_id))
    }, [workspace_id])

    return (
        <div className="workspace-detail-container">

            {/* SIDEBAR */}
            <div className="channel-sidebar">
                {response && (
                    <h1 className="workspace-header">
                        {response.data.workspace.name}
                    </h1>
                )}

                <ChannelList />
            </div>

            {/* ÁREA PRINCIPAL */}
            <div className="main-content-area">

                {/* FORMULARIO DE INVITACIÓN */}
                <div className="invite-form-container">
                    <InviteUserForm workspace_id={workspace_id} />
                </div>

                {/* 📌 RUTAS INTERNAS PARA CARGAR MENSAJES */}
                <Routes>

                    {/* Cuando NO hay canal seleccionado */}
                    <Route
                        index
                        element={<p className="select-channel-hint">
                            Selecciona un canal para ver los mensajes.
                        </p>}
                    />

                    {/* Cuando hay un canal seleccionado */}
                    <Route
                        path=":channel_id"
                        element={<ChannelMessages />}
                    />
                </Routes>

                {loading && <p>Cargando workspace...</p>}
                {error && <p className="error-message">Error: {error.message}</p>}
            </div>
        </div>
    )
}

export default WorkspaceDetailScreen
