import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaceList } from '../../services/workspaceService'
import { Link } from 'react-router'

const HomeScreen = () => {
    const { loading, response, error, sendRequest } = useFetch()

    useEffect(() => {
        sendRequest(getWorkspaceList)
    }, [])
    return (
        <div>
            <h1>Bienvenido, estos son tus espacios de trabajo</h1>

            {
                !loading &&
                response?.data?.workspaces?.map((mw) => (
                    <div key={mw._id}>
                        <h2>{mw.workspace?.name}</h2>
                        <a href={`/workspace/${mw.workspace?._id}`}>Entrar</a>
                    </div>
                ))
            }

            <Link to={'/workspace/new'}>
                Crear nuevo espacio de trabajo
            </Link>
        </div>
    )
}

export default HomeScreen
