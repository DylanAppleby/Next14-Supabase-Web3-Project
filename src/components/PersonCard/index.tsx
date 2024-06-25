/* eslint-disable react/no-array-index-key */
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useState } from 'react'

import Button from 'components/Button'
import CircleTag from 'components/CircleTag'
import { Envelope } from 'components/Icons'
import { supabase } from 'services/supabase'
import { IPerson } from 'types/supabaseTables'
import { Paths } from 'utils/constants'

const PersonCard = ({ person }: { person: IPerson }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSelect = useCallback(
    (id: string) => {
      router.push(`${Paths.CIRCLE}/${id}`)
    },
    [router]
  )

  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (threadId: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(
        threadId ? 'thread' : 'request',
        threadId || person.selected_user_id
      )
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, person.selected_user_id, router, pathname]
  )

  const handleRedirectToChat = useCallback(async () => {
    setIsLoading(true)
    const { data } = await supabase.rpc('threads_get_thread_id', {
      user_id: person.selected_user_id,
    })

    if (data) {
      createQueryString(data)
    } else createQueryString('')

    setIsLoading(false)
  }, [createQueryString, person.selected_user_id])

  return (
    <div className="space-y-5 rounded-5 bg-white p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={person.selected_user_avatar_url}
            alt="avatar"
            width={44}
            height={44}
            className="aspect-square rounded-2xl"
          />
          <Link
            href={`${Paths.PEOPLE}/${person.selected_user_id}`}
            className="text-xl font-bold hover:underline"
          >
            {person.selected_user_name}
          </Link>
        </div>
        <Button
          isLoading={isLoading}
          onClick={handleRedirectToChat}
          className="flex h-max items-center gap-2 rounded-lg border p-2"
        >
          <Envelope /> Message
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {person.common_circles.map((circle) => (
          <CircleTag
            circleData={circle}
            key={circle.circle_id}
            varient="secondary"
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {person.posts_context.map((context, idx) => (
          <span
            key={idx}
            className="relative rounded-5 border border-stroke px-5 py-4.5 text-sm font-medium"
          >
            <span className="line-clamp-2">{context}</span>
            <div className="absolute bottom-5 left-0 h-4 w-full bg-gradient-to-t from-white/90 to-white/40" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default PersonCard
