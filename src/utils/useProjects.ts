import { useCallback, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Project } from 'screens/projectList/Index'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './useAsync'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    // [] 内值变化的时候，就会自动触发ß
    return useQuery<Project[]>(['projects', param], () =>
        client('projects', { data: param })
    )
}

export const useEditProjects = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, { data: params, method: 'PATCH' }),
        {
            onSuccess: () => queryClient.invalidateQueries('projects'),
        }
    )
}
export const useAddProjects = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, { data: params, method: 'POST' }),
        {
            onSuccess: () => queryClient.invalidateQueries('projects'),
        }
    )
}

export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        // 如果没有 id 的话，就不访问请求
        {
            enabled: !!id,
        }
    )
}
