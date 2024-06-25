import { useParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from 'components'
import FallbackImage from 'components/FallbackImage'
import { supabase } from 'services/supabase'
import { ICircle } from 'types/supabaseTables'
import { INITIAL_CIRCLE_DATA, supabaseStorageUrl } from 'utils/constants'

import CircleDetails from './CircleDetails'
import EditCircle from './EditCircle'

const JoinCircle = () => {
  const [circleData, setCircleData] = useState<ICircle>(INITIAL_CIRCLE_DATA)
  const [isLoadingCircle, setIsLoadingCircle] = useState<boolean>(false)
  const [showEditCircle, setShowEditCircle] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasJoined, setHasJoined] = useState<boolean>(false)

  const { id } = useParams() || ''

  const fetchCircle = useCallback(async () => {
    if (!id) return

    setIsLoadingCircle(true)
    const { data, error } = await supabase
      .rpc('circles_get_circles_info_detailed', {
        circles_list: [id as string],
      })
      .single()

    setIsLoadingCircle(false)

    if (data) setCircleData(data)
    else if (error) toast.error(error.message)
  }, [id])

  useEffect(() => {
    fetchCircle()
  }, [fetchCircle])

  const fetchCircleUser = useCallback(async () => {
    if (typeof id !== 'string' || !id) return

    setIsLoading(true)
    const { data: isJoined, error } = await supabase.rpc(
      'check_auth_user_is_in_the_circle',
      { circleid: id }
    )
    setIsLoading(false)

    if (error) toast.error(error.message)
    if (isJoined !== null) setHasJoined(isJoined)
  }, [id])

  useEffect(() => {
    fetchCircleUser()
  }, [fetchCircleUser])

  return (
    <div className="relative flex flex-col items-center gap-3 rounded-5 bg-white p-5">
      {id && !isLoadingCircle ? (
        <>
          {circleData.circle_logo_image && (
            <FallbackImage
              src={circleData.circle_logo_image}
              defaultSrc={`${supabaseStorageUrl}/circle_images/default.jpg`}
              alt={circleData.name || ''}
              width={156}
              height={156}
              className="aspect-square rounded-5 bg-zinc-100"
            />
          )}
          {showEditCircle ? (
            <EditCircle
              circleData={circleData}
              setCircleData={setCircleData}
              setShowEditCircle={setShowEditCircle}
              circleId={id as string}
            />
          ) : (
            <CircleDetails
              circleData={circleData}
              setShowEditCircle={setShowEditCircle}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              hasJoined={hasJoined}
              setHasJoined={setHasJoined}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default JoinCircle
