import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'

import { People } from 'components'
import { supabase } from 'services/supabase'
import { IUser } from 'types/supabaseTables'
import { Paths } from 'utils/constants'

const UserSkeleton = () => (
  <div className="flex items-center gap-3.5">
    <Skeleton
      height={28}
      width={28}
      className="leading-1 h-3 rounded-full border border-black/10"
    />
    <div className="mt-2 flex w-full flex-col">
      <Skeleton width={120} className="leading-1 h-3 rounded-xl" />
    </div>
  </div>
)

const CircleUsers = () => {
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [userCount, setUserCount] = useState<number>(0)

  const { id: circleId } = useParams() || {
    id: '',
  }

  const fetchUsers = useCallback(async () => {
    if (!circleId) return

    setIsloading(true)
    const { data, error, count } = await supabase
      .rpc(
        'get_users_in_circle',
        {
          circle_id: circleId as string,
        },
        { count: 'exact' }
      )
      .limit(3)
    setIsloading(false)

    if (error) toast.error(error.message)
    else if (data) {
      setUsers(data)
      setUserCount(count || 0)
    }
  }, [circleId])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const userList = useMemo(
    () =>
      users.map((user) => (
        <div
          key={user.id}
          className="group flex cursor-pointer items-center gap-3.5"
        >
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="user"
              className="aspect-square h-7 w-7 rounded-full"
              height={28}
              width={28}
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-lightGray" />
          )}
          <Link
            href={`${Paths.PEOPLE}/${user.id}`}
            className="text-xs font-bold text-black hover:underline"
          >
            {user.user_name}
          </Link>
        </div>
      )),
    [users]
  )

  return (
    <div className="flex flex-col overflow-hidden rounded-5 bg-white">
      <div className="flex items-center gap-3 border-b p-4">
        <People size="24" />
        <span className="text-base font-semibold text-black opacity-90">
          Circle Users
        </span>
      </div>
      <span className="px-4 pt-4 text-xs font-semibold text-black/60">
        {userCount} People
      </span>
      <div className="space-y-5 p-4">
        {userList}
        {isLoading && <UserSkeleton />}
      </div>
    </div>
  )
}

export default CircleUsers
