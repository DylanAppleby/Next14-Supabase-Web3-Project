import { usePathname, useSearchParams } from 'next/navigation'

export const useQueryParams = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const set = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(key, value)
    return `${pathname}?${newParams.toString()}`
  }

  const deleteParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(key)
    return `${pathname}?${newParams.toString()}`
  }
  return { set, deleteParam }
}
