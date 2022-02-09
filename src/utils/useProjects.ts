import { useEffect } from "react"
import { IList } from "screens/project-list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"


export const useProjects = (param: Partial<IList>) => {
    const client = useHttp()

    const { run, ...results } = useAsync<IList[]>()

    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return results
}