import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { useCallback } from 'react'

import classNames from 'classnames'
import { IFriend, ILastMessage } from 'types/supabaseTables'
import { supabaseStorageUrl } from 'utils/constants'

type IItem =
  | {
      type: 'user'
      friend: IFriend
    }
  | {
      type: 'message'
      friend: ILastMessage
    }

const Item = ({ type, friend }: IItem) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('thread', type === 'user' ? friend.id : friend.thread_id)
    return `${pathname}?${params.toString()}`
  }, [searchParams, type, friend, pathname])

  return (
    <div
      className={classNames('flex gap-2 border-b border-stroke py-4', {
        'items-center': type !== 'message',
      })}
    >
      <Image
        src={
          friend.avatar_url || `${supabaseStorageUrl}/circle_images/default.jpg`
        }
        alt="avatar"
        width={31}
        height={31}
        className={classNames('aspect-square h-min rounded-xl', {
          'mt-1.5': type === 'message',
        })}
      />
      <Link
        href={createQueryString()}
        className="flex flex-col text-base font-semibold"
      >
        {friend.user_name}
        {type === 'message' ? (
          <span
            className={classNames('font-medium', {
              'text-black/90': !friend.is_seen,
              'text-tertiary': friend.is_seen,
            })}
          >
            {friend.content}
          </span>
        ) : (
          <span className="font-medium text-tertiary">
            {!friend.is_friend && 'Wants to be your friend'}
          </span>
        )}
      </Link>
    </div>
  )
}

export default Item
