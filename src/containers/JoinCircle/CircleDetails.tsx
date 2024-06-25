import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Dispatch, memo, SetStateAction, useCallback } from 'react'
import toast from 'react-hot-toast'

import { Button, Pencil } from 'components'
import { useAuth } from 'contexts/AuthContext'
import { useCirclesContext } from 'contexts/circlesData'
import { supabase } from 'services/supabase'
import { ICircle } from 'types/supabaseTables'
import { Paths } from 'utils/constants'

const CircleDetails = ({
  circleData,
  setShowEditCircle,
  hasJoined,
  setHasJoined,
  isLoading,
  setIsLoading,
}: {
  circleData: ICircle
  setShowEditCircle: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  hasJoined: boolean
  setHasJoined: Dispatch<SetStateAction<boolean>>
}) => {
  const { user } = useAuth()
  const { setCircles } = useCirclesContext()
  const { id } = useParams() || ''

  const fetchCircles = useCallback(async () => {
    if (!user.id) return

    const { data, error } = await supabase.rpc('users_get_user_circles', {
      user_id: user.id,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    setCircles(data)
  }, [setCircles, user.id])

  const handleToggleCircle = useCallback(async () => {
    if (typeof id !== 'string' || !id) return

    setIsLoading(true)
    const { error } = await supabase.rpc(
      hasJoined ? 'users_leave_circle' : 'users_join_circle',
      {
        circle_id: id,
      }
    )
    setIsLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    fetchCircles()
    setHasJoined((val) => !val)
  }, [fetchCircles, hasJoined, id, setHasJoined, setIsLoading])

  return (
    <>
      <h1 className="flex items-center gap-2 text-lg font-bold">
        {circleData.name}
        {user.id === circleData.created_by && (
          <button type="button" onClick={() => setShowEditCircle(true)}>
            <Pencil />
          </button>
        )}
      </h1>
      <Link
        className="-translate-y-3 text-xs font-bold text-black/60 hover:underline"
        href={`${Paths.PEOPLE}/${circleData.created_by}`}
      >
        Created by {circleData.creator_name}
      </Link>
      {hasJoined && (
        <p className="text-sm text-black/60">{circleData.description}</p>
      )}
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        onClick={handleToggleCircle}
        className="w-full bg-red px-5 text-white"
      >
        {hasJoined ? 'Leave' : 'Join'}
      </Button>
    </>
  )
}

export default memo(CircleDetails)
