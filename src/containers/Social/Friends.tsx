import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Spinner } from 'components'
import { supabase } from 'services/supabase'
import { IFriend } from 'types/supabaseTables'

import Item from './Item'

const Friends = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [friends, setFriends] = useState<IFriend[]>([])

  const fetchFriends = useCallback(async () => {
    if (!userId) return
    setIsLoading(true)
    const { error, data } = await supabase.rpc('threads_get_threads_list')
    setIsLoading(false)
    if (!error) setFriends(data)
    else toast.error(error.message)
  }, [userId])

  useEffect(() => {
    setFriends([])
    fetchFriends()
  }, [fetchFriends])

  useEffect(() => {
    const threadChannel = supabase
      .channel('public:threads')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'threads',
        },
        () => {
          fetchFriends()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(threadChannel)
    }
  }, [fetchFriends, userId])

  const friendList = useMemo(
    () =>
      friends.map((data) => <Item friend={data} key={data.id} type="user" />),
    [friends]
  )
  return isLoading ? (
    <div className="flex w-full justify-center p-4">
      <Spinner />
    </div>
  ) : (
    friendList
  )
}

export default Friends
