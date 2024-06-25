import Link from 'next/link'

import { useCallback, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import FallbackImage from 'components/FallbackImage'
import { Intersection, Magnifier } from 'components/Icons'
import { useAuth } from 'contexts/AuthContext'
import { useCirclesContext } from 'contexts/circlesData'
import { supabase } from 'services/supabase'
import { supabaseStorageUrl } from 'utils/constants'

const CircleList = () => {
  const { circles, setCircles } = useCirclesContext()

  const { user } = useAuth()

  const fetchCircle = useCallback(async () => {
    if (!user.id || circles.length > 0) return

    const { data, error } = await supabase.rpc(
      'users_get_user_circles_detailed',
      {
        user_id: user.id,
      }
    )

    if (error) {
      toast.error(error.message)
      return
    }

    setCircles(data)
  }, [circles.length, setCircles, user.id])

  useEffect(() => {
    fetchCircle()
  }, [fetchCircle])

  const circleList = useMemo(
    () =>
      circles?.map((circle) => (
        <li
          key={circle.id}
          className={classNames(
            'transition-color flex w-full animate-fade items-center gap-4 px-6 py-3 duration-300 ease-in-out',
            'rounded-5 hover:bg-darkGreen/5'
          )}
        >
          {circle.circle_logo_image && (
            <FallbackImage
              src={circle.circle_logo_image}
              alt="Circle"
              defaultSrc={`${supabaseStorageUrl}/circle_images/default.jpg`}
              width={64}
              height={64}
              className="aspect-square h-16 w-16 rounded-full bg-zinc-100"
            />
          )}
          <div className="flex h-18 flex-col justify-center">
            <Link
              href={`/circle/${circle.id}`}
              className="line-clamp-2 text-sm font-bold hover:underline"
            >
              {circle.name}
            </Link>
            <span className="mt-0.5 overflow-hidden text-xs font-medium text-black/60">
              Created by {circle.creator_name}
            </span>
          </div>
        </li>
      )),
    [circles]
  )

  return (
    <section
      title="circles"
      className="flex h-min min-w-46 flex-wrap rounded-5 bg-white"
    >
      <ul className="max-h-lg overflow-y-scroll scrollbar-none">
        {circleList}
      </ul>
      <div className="flex w-full justify-center gap-2 p-3.5">
        <Intersection />
        <span className="border-x" />
        <Magnifier className="opacity-40" />
      </div>
    </section>
  )
}

export default CircleList
