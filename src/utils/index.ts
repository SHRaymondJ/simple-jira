import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? true : !value)
export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === ''
export const cleanObject = (object: { [key: string]: unknown }) => {
    const res = { ...object }
    // Object.keys(res).forEach((key) => {
    //     const value = object[key]
    //     if (isFalsy(value)) {
    //         delete res[key]
    //     }
    // })
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key]
            if (isVoid(element)) {
                delete res[key]
            }
        }
    }
    return res
}
export const useMount = (callback: () => void) => {
    return useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value: V, delay = 300) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        let timer = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debounceValue
}
