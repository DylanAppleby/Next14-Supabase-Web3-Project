import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { useCallback } from 'react'

import classNames from 'classnames'
import { useAuth } from 'contexts/AuthContext'

import Friends from './Friends'
import Threads from './Threads'

const Chat = dynamic(() => import('containers/Chat'))

const Social = () => {
  const { user } = useAuth()
  const threadId = useSearchParams().get('thread')
  const personId = useSearchParams().get('request')
  const searchParams = useSearchParams()
  const socialTab = searchParams.get('socials')
  const pathname = usePathname()

  const createQueryString = useCallback(
    (type: 'messages' | 'friends') => {
      const params = new URLSearchParams(searchParams)
      params.set('socials', type)
      return `${pathname}?${params.toString()}`
    },
    [searchParams, pathname]
  )

  return (
    <>
      <div className="relative">
        <div className="flex min-h-md flex-col overflow-hidden rounded-5 bg-white px-4 py-2">
          <h1 className="flex items-center py-2 font-bold">Social</h1>

          <div className="flex w-full items-center text-sm font-medium">
            <Link
              href={createQueryString('friends')}
              className={classNames('w-1/2 border-b p-3 text-center', {
                'border-black': socialTab !== 'messages',
                'border-stroke': socialTab === 'messages',
              })}
            >
              All Friends
            </Link>
            <Link
              href={createQueryString('messages')}
              className={classNames('w-1/2 border-b p-3 text-center', {
                'border-black': socialTab === 'messages',
                'border-stroke': socialTab !== 'messages',
              })}
            >
              Messages
            </Link>
          </div>
          {socialTab === 'messages' ? (
            <Threads userId={user.id} />
          ) : (
            <Friends userId={user.id} />
          )}
        </div>
      </div>
      {(threadId || personId) && <Chat />}
    </>
  )
}

export default Social
