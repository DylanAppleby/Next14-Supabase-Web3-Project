import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'

import { AddFriend, Cross } from 'components'
import { INITIAL_USER_DATA, useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { IUser } from 'types/supabaseTables'
import { supabaseStorageUrl, Tables } from 'utils/constants'

import Messages from './Messages'
import SendMessage from './SendMessage'

const ChatComponent = () => {
  const [person, setPerson] = useState<IUser>(INITIAL_USER_DATA)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const threadId = searchParams.get('thread')
  const personId = searchParams.get('request')
  const [isFriend, setIsFriend] = useState<boolean>(false)

  const { user } = useAuth()

  const fetchFriend = useCallback(async () => {
    let userId: string = ''

    if (threadId) {
      const { data: friendData, error: threadErr } = await supabase
        .from(Tables.THREADS)
        .select('*')
        .eq('id', threadId)
        .single()

      if (threadErr) {
        toast.error(threadErr.message)
        return
      }

      setIsFriend(friendData.is_friend)
      if (friendData.user_one === user.id) {
        userId = friendData.user_two
      } else userId = friendData.user_one
    } else if (personId) userId = personId
    else return

    const { data, error } = await supabase
      .from(Tables.USERS)
      .select('*')
      .eq('id', userId)
      .single()

    if (data) setPerson(data)
    else if (error) toast.error(error.message)
  }, [personId, threadId, user.id])

  useEffect(() => {
    fetchFriend()
  }, [fetchFriend])

  const handleCloseChat = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('thread')
    newParams.delete('request')
    router.push(`${pathname}?${newParams}`)
  }

  return (
    <div className="absolute bottom-0 right-[5%] z-30 flex h-full max-h-md w-full max-w-99 flex-col overflow-hidden rounded-t-5 bg-white shadow-blackLightV2">
      <div className="sticky top-0 flex h-16 w-full justify-between border-b border-stroke p-4">
        <div className="flex items-center gap-3">
          <Image
            src={
              person.avatar_url ||
              `${supabaseStorageUrl}/circle_images/default.jpg`
            }
            alt="avatar"
            width={31}
            height={31}
            className="aspect-square h-min rounded-xl"
          />
          <h1 className="font-semibold">
            {person.first_name} {person.last_name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <AddFriend />
          <span className="h-5 border-r border-stroke" />
          <button type="button" onClick={handleCloseChat}>
            <Cross size="24" />
          </button>
        </div>
      </div>
      <Messages
        setIsFriend={setIsFriend}
        isFriend={isFriend}
        threadId={threadId}
        userId={user.id}
        personId={person.id}
      />
      <SendMessage personId={person.id} />
    </div>
  )
}

const ChatModal = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])
  if (isBrowser) {
    return createPortal(
      <ChatComponent />,
      document.getElementById('modal-root') as Element
    )
  }

  return null
}

export default ChatModal
