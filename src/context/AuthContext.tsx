import React, { ReactNode, useContext } from 'react'
import { User } from 'screens/projectList/Index'
import * as auth from 'AuthProvider'
import { http } from 'utils/http'
import { useMount } from 'utils/index'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/libs'
import { useCallback } from 'react'
import * as authStore from 'store/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
export interface AuthForm {
    username: string
    password: string
}

export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {
        data: user,
        isIdle,
        isLoading,
        isError,
        run,
        error,
    } = useAsync<User | null>()
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    useMount(
        useCallback(() => {
            run(dispatch(authStore.bootstrap()))
        }, [run])
    )

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }
    return <div>{children}</div>
}

export const useAuth = () => {
    // 要显示声明一下 dispatch 返回的是 Promise
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(authStore.selectUser)
    const login = useCallback(
        (form: AuthForm) => dispatch(authStore.login(form)),
        [dispatch]
    )
    const register = useCallback(
        (form: AuthForm) => dispatch(authStore.register(form)),
        [dispatch]
    )
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    return {
        user,
        login,
        register,
        logout,
    }
}
