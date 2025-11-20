import ENVIRONMENT from "../config/environment";
import { getAuthorizationToken } from "../constants/http";

/* 
GET /api/workspace/:workspace_id/channels
*/
async function getChannelListByWorkspaceId(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + "/api/workspaces/" + workspace_id + "/channels",
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getAuthorizationToken(),
            },
        }
    );
    const response_data = await response_http.json();
    if (!response_data.ok) {
        throw new Error(response_data.message || "Error al obtener los canales");
    }
    return response_data;
}
/* 
POST /api/workspace/:workspace_id/channels
Debe enviar el name por body
*/
async function createNewChannel(workspace_id, name) {
  const body = {
    name: name,
  };
  const response_http = await fetch(
    ENVIRONMENT.URL_API + "/api/workspaces/" + workspace_id + "/channels",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getAuthorizationToken()}`,
      },
      body: JSON.stringify(body),
    }
  );
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message);
  }
  return response_data;
}

export { getChannelListByWorkspaceId, createNewChannel }