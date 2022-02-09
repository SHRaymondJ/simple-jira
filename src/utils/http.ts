import qs from 'qs'
import { logout } from '../AuthProvider'
import { useAuth } from '../context/AuthContext'

const apiUrl = process.env.REACT_APP_API_URL

interface Configure extends RequestInit {
    data?: object
    token?: string
}
export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Configure = {}
) => {
    const config = {
        method: customConfig?.method ? customConfig.method : 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            // logout()
            // window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const { user } = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { ...config, token: user?.token })
}
