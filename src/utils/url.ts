import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'
/**
 * 返回 url 路径中，指定键的参数值
 * @param keys
 * @returns
 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
    // useSearchParams 获取 url 路径的参数
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(
            () =>
                keys.reduce((prev, key) => {
                    return { ...prev, [key]: searchParams.get(key) || '' }
                }, {} as { [key in K]: string }),
            [keys, searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({
                ...Object.fromEntries(searchParams),
                ...params,
            }) as URLSearchParamsInit
            return setSearchParam(o)
        },
    ] as const
}