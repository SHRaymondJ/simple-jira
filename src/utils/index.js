import { useEffect, useState } from "react"

export const isFalsy = (value) => value === 0 ? true : !value
export const cleanObject = (obj) => {
  const res = {...obj}
  Object.keys(res).forEach(key => {
    const value = obj[key]
    if(isFalsy(value)) {
      delete res[key]
    }
  })
  return res
}
export const useMount = (callback) => {
  return useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceValue
}