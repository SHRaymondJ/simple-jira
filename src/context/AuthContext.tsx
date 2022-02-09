import { createContext, ReactNode, useContext, useState } from 'react'
import { IUsers } from '../screens/project-list'
import * as auth from '../AuthProvider'
import { http } from '../utils/http'
import { useMount } from '../utils'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'

interface AuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = createContext<
    | {
          user: IUsers | null
          login: (form: AuthForm) => Promise<void>
          register: (form: AuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {data: user, isIdle, isLoading, isError, run, setData: setUser, error } = useAsync<IUsers | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(async () => {
        const newUser = await bootstrapUser()
        if (newUser) setUser(newUser)
    })
    
    if(isIdle || isLoading) {
        return <FullPageLoading />
    }

    if(isError) {
        return <FullPageErrorFallback error={error}/>
    }
    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('请在 AuthProvider 中使用 useAuth')
    }
    return context
}
