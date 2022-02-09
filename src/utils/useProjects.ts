import { useEffect } from 'react'
import { Project } from 'screens/projectList/Index'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()
    const fetchProjects = () =>
        client('projects', { data: cleanObject(param || {}) })
    useEffect(
        () => {
            run(fetchProjects(), {
                retry: fetchProjects,
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [param]
    )
    return result
}

export const useEditProjects = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: 'PATCH',
            })
        )
    }
    return {
        mutate,
        ...asyncResult,
    }
}
export const useAddProjects = () => {
    const client = useHttp()
    const { run, ...asyncResult } = useAsync()
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: 'POST',
            })
        )
    }
    return {
        mutate,
        ...asyncResult,
    }
}
