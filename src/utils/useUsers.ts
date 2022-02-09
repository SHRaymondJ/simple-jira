import { useEffect } from "react";
import { IUsers } from "screens/project-list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUsers = (param?: Partial<IUsers>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<IUsers[]>()
    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result 
}