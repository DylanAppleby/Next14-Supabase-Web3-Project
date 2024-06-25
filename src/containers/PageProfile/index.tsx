/* eslint-disable prettier/prettier */
import Link from 'next/link'

import { memo, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { AvatarImage, Button, Pencil } from 'components'
import { Diamond } from 'components/Icons'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { Paths } from 'utils/constants'

const PageProfile = () => {
  const { user } = useAuth()
  const [userCount, setUserCount] = useState<number>(0)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingLikes, setIsLoadingLikes] = useState<boolean>(false)

  const fetchCircleUserCount = useCallback(async () => {
    if (!user.id) return

    setIsLoading(true)
    const { data, error } = await supabase.rpc(
      'users_get_unique_users_count_in_circles',
      { userid: user.id }
    )
    setIsLoading(false)

    if (error) toast.error(error.message)
    else if (data) setUserCount(data)
  }, [user.id])

  const fetchUserLikesCount = useCallback(async () => {
    if (!user.id) return

    setIsLoadingLikes(true)
    const { data, error } = await supabase.rpc('get_total_likes', {
      userid: user.id,
    })
    setIsLoadingLikes(false)

    if (error) toast.error(error.message)
    else if (data) setLikeCount(data)
  }, [user.id])

  useEffect(() => {
    fetchCircleUserCount()
  }, [fetchCircleUserCount])

  useEffect(() => {
    fetchUserLikesCount()
  }, [fetchUserLikesCount])

  return (
    user.email && (
      <div className="relative flex w-full flex-col items-center gap-1 rounded-5 bg-white px-6 pb-6 pt-8">
        <AvatarImage avatarSrc={user.avatar_url} />
        <h1 className="flex items-center gap-1 font-semibold">
          {user.first_name} {user.last_name}
          <Link href={Paths.PEOPLE_UPDATE}>
            <Pencil className="-translate-y-0.5" />
          </Link>
        </h1>
        <h2 className="text-sm text-black/60">{user.bio}</h2>
        <p className="flex items-center gap-1 text-2.5 font-bold text-black/40">
          Joined {new Date(user.created_at).toDateString()}
          <Diamond className="-translate-y-0.25" />
        </p>
        <div className="mt-6 flex w-full gap-2">
          <Button
            isLoading={isLoadingLikes}
            className="w-full !rounded-5 bg-zinc-100 !p-6 text-xl font-bold"
          >
            🍑 {`${likeCount}`}
          </Button>
          <Button
            isLoading={isLoading}
            className="w-full !rounded-5 bg-zinc-100 !p-6 text-xl font-bold"
          >
            🧑‍🤝‍🧑 {`${userCount}`}
          </Button>
        </div>
      </div>
    )
  )
}

export default memo(PageProfile)
