import { HTTP_METHODS, HEADERS } from "../constants/http"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

export function getMessagesByChannel(channel_id) {
    return fetch(`${BASE_URL}/api/messages/${channel_id}`, {
        method: HTTP_METHODS.GET,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
}

export function sendMessage(channel_id, content) {
    return fetch(`${BASE_URL}/api/messages/${channel_id}`, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.CONTENT_TYPE]: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content })
    })
}
