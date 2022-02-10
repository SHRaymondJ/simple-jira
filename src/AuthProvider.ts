import { http } from './utils/http'
import { User } from 'screens/projectList/Index'
import { AuthForm } from 'context/AuthContext'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    window.location.search = ''
    return user
}

export const login = (data: AuthForm) => {
    return http('login', { data, method: 'POST' }).then(handleUserResponse)
}

export const register = (data: AuthForm) => {
    return http('register', { data, method: 'POST' }).then(handleUserResponse)
}

export const logout = async () =>
    window.localStorage.removeItem(localStorageKey)

    