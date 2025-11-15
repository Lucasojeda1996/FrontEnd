import ENVIRONMENT from "../config/environment.js";
import {getAuthorizationToken} from "../constants/http.js"

import LOCALSTORAGE_KEYS from "../constants/localstorage";

async function getWorkspaceList() {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspaces',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthorizationToken()
            }
        }
    )

    const response_data = await response_http.json()
    return response_data
}

/*
createWorkspace(name, url_img = '')
Consumir la api para crear un workspace
*/
async function createWorkspace(name, url_image = "") {
    return fetch(ENVIRONMENT.URL_API + "/api/workspaces", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getAuthorizationToken()}`
        },
        body: JSON.stringify({
            name,
            url_img: url_image
        })
    })
}

async function getWorkspaceById(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + "/api/workspace/" + workspace_id,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getAuthorizationToken(),
            },
        }
    );
    const response_data = await response_http.json();
    if (!response_data.ok) {
        throw new Error(response_data.message || "Error al obtener el workspace")
    }
    return response_data
}

async function inviteUser (email, workspace_id){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + "/api/workspace/" + workspace_id + "/invite",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${getAuthorizationToken()}`
            },
            body: JSON.stringify({invited_email: email})
        }
    )
    const response_data = await response_http.json()
    if (!response_data.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}

export { getWorkspaceList, createWorkspace, getWorkspaceById, inviteUser}