import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceList } from '../../services/workspaceService'
import { Link } from 'react-router'
import './HomeScreen.css'

const HomeScreen = () => {
    const { loading, response, error, sendRequest } = useFetch()

    useEffect(() => {
        sendRequest(getWorkspaceList)
    }, [])

    const workspaces = response?.data?.workspaces || []

    return (
        <div className="home-container">
            <h1 className="home-title">
                Bienvenido, estos son tus espacios de trabajo
            </h1>

            <div className="workspace-list">
                {!loading &&
                    workspaces.map((mw) => (
                        <div className="workspace-card" key={mw._id}>
                            <h2 className="workspace-name">
                                {mw.workspace?.name}
                            </h2>

                            <a
                                className="workspace-link"
                                href={`/workspace/${mw.workspace?._id}`}
                            >
                                Entrar
                            </a>
                        </div>
                    ))
                }
            </div>

            <Link to={'/workspace/new'} className="create-workspace-btn">
                Crear nuevo espacio de trabajo
            </Link>
        </div>
    )
}

export default HomeScreen
