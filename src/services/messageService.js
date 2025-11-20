import ENVIRONMENT from "../config/environment";
import { getAuthorizationToken } from "../constants/http";

/* 
GET /api/workspaces/:workspace_id/channels/:channel_id/messages
*/
async function getChannelMessages(workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            "/api/workspaces/" +
            workspace_id +
            "/channels/" +
            channel_id +
            "/messages",
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getAuthorizationToken(),
            },
        }
    );

    const response_data = await response_http.json();

    if (!response_data.ok) {
        throw new Error(response_data.message || "Error al obtener mensajes");
    }

    return response_data;
}


/* 
POST /api/workspaces/:workspace_id/channels/:channel_id/messages
Body: { content: "texto del mensaje" }
*/
async function sendMessage(workspace_id, channel_id, content) {
    const body = {
        content: content,
    };

    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            "/api/workspaces/" +
            workspace_id +
            "/channels/" +
            channel_id +
            "/messages",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAuthorizationToken(),
            },
            body: JSON.stringify(body),
        }
    );

    const response_data = await response_http.json();

    if (!response_data.ok) {
        throw new Error(response_data.message || "Error al enviar el mensaje");
    }

    return response_data;
}


export { 
    getChannelMessages,
    sendMessage
};
