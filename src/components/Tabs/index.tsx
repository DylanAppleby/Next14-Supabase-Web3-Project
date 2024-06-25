import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { FC, memo, ReactNode, useCallback, useEffect } from 'react'

import classNames from 'classnames'

type ITabs = {
  tabs: string[]
  children: ReactNode
}

const Tabs: FC<ITabs> = ({ tabs, children }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const tab = searchParams.get('tab')
  const router = useRouter()

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('tab', value)
      return params.toString()
    },
    [searchParams]
  )

  const handleRoute = useCallback(
    (value: string) => {
      router.push(`${pathname}?${createQueryString(value)}`)
    },
    [createQueryString, pathname, router]
  )

  useEffect(() => {
    handleRoute(tabs[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-10 flex flex-col justify-center space-y-5">
      <div className="flex space-x-7 border-b border-white/10 text-2xl">
        {tabs.map((value: string) => (
          <Link
            href={`${pathname}?${createQueryString(value)}`}
            key={value}
            className={classNames(
              'border-b-4 text-lg font-semibold capitalize tracking-wide',
              {
                'border-black/90 text-black/90 transition-all ease-in-out':
                  tab === value,
                'border-transparent text-black/60': tab !== value,
              }
            )}
          >
            {value}
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}

export default memo(Tabs)
