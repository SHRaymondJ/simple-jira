import { useMemo } from 'react'
import { useUrlQueryParams } from 'utils/url'

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParams(
        useMemo(() => ['name', 'personId'], [])
    )
    return [
        useMemo(() => {
            return { ...param, personId: Number(param.personId) || undefined }
        }, [param]),
        setParam,
    ] as const
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
        'projectCreate',
    ])

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setProjectCreate({ projectCreate: undefined })

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close,
    }
}
