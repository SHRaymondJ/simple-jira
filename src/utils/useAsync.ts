import { useState } from 'react'

interface State<D = null> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idle',
}
export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState,
    })

    const setData = (data: D) => {
        setState({
            error: null,
            data,
            stat: 'success',
        })
    }

    const setError = (error: Error) => {
        setState({
            error,
            data: null,
            stat: 'error',
        })
    }

    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型')
        }
        setState({ ...state, stat: 'loading' })
        return promise
            .then((data) => {
                setData(data)
                return data
            })
            .catch((err) => {
                setError(err)
                return Promise.reject(err)
            })
    }

    return {
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isIdle: state.stat === 'idle',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        run,
        ...state,
    }
}
