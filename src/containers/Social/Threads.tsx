import { useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from 'components'
import { supabase } from 'services/supabase'
import { ILastMessage } from 'types/supabaseTables'

import Item from './Item'

const Threads = ({ userId }: { userId: string }) => {
  const [lastMessages, setLastMessages] = useState<ILastMessage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const threadId = useSearchParams().get('thread')

  const fetchFriendMessages = useCallback(async () => {
    if (!userId) return
    setIsLoading(true)
    const { error, data } = await supabase.rpc(
      'messages_get_thread_last_message_list'
    )
    setIsLoading(false)
    if (!error) setLastMessages(data)
    else toast.error(error.message)
  }, [userId])

  useEffect(() => {
    setLastMessages([])
    fetchFriendMessages()
  }, [fetchFriendMessages])

  const threadList = useMemo(() => {
    return [
      ...lastMessages.map((data) => (
        <Item friend={data} key={data.id} type="message" />
      )),
    ]
  }, [lastMessages])

  useEffect(() => {
    const threadChannel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=neq.${threadId}`,
        },
        () => {
          fetchFriendMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(threadChannel)
    }
  }, [fetchFriendMessages, threadId, userId])

  return isLoading ? (
    <div className="flex w-full justify-center p-4">
      <Spinner />
    </div>
  ) : (
    threadList
  )
}

export default Threads
