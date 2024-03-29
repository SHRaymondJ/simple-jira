import qs from 'qs'
import { useAuth } from './../context/AuthContext'
import * as auth from './../AuthProvider'
import { useCallback } from 'react'
const apiURL = process.env.REACT_APP_API_URL

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

    return fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            await auth.logout()
            window.location.reload()
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
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    )
}

// type Person = {
//     name: string
//     age: number
// }

// const xiaoMing: Partial<Person> = { name: 'xiaoming' }
// const shenMiRen: Omit<Person, 'name' | 'age'> = { name: '123', age: 123 }
// const pickPerson: Pick<Person, 'name'> = { name: '123' }
// type PersonKeys = keyof Person
// const excludePerson: Exclude<PersonKeys, 'name'> = 'age'

// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }
