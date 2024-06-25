import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import { Button, Spinner } from 'components'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { IMessage } from 'types/supabaseTables'
import { Tables } from 'utils/constants'

import Message from './Message'

type IRequest = {
  created_at: string
  id?: string
  receiver_id: string
  sender_id: string
}

const Messages = ({
  setIsFriend,
  threadId,
  personId,
  userId,
  isFriend,
}: {
  setIsFriend: Dispatch<SetStateAction<boolean>>
  threadId: string | null
  personId?: string | null
  userId?: string
  isFriend: boolean
}) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [requestData, setRequestData] = useState<IRequest | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFetchingData, setFetchingData] = useState<boolean>(false)
  const [hasSentRequest, setHasSentRequest] = useState<boolean>(isFriend)

  const { user } = useAuth()
  useEffect(() => {
    const fetchMessages = async () => {
      setMessages([])
      if (!threadId) return
      setFetchingData(true)
      const { data, error } = await supabase
        .from(Tables.MESSAGES)
        .select()
        .order('created_at', { ascending: false })
        .eq('thread_id', threadId)

      setFetchingData(false)
      if (!error) {
        setMessages(data)
      } else {
        toast.error(error.message)
      }
    }

    fetchMessages()
  }, [threadId])

  useEffect(() => {
    const checkHasRequested = async () => {
      if (!personId || isFriend) return

      const { data } = await supabase
        .rpc('check_request_of_user', {
          user_id: personId,
        })
        .single()

      if (data) {
        setRequestData(data)
        setHasSentRequest(true)
      } else setHasSentRequest(false)
    }

    checkHasRequested()
  }, [isFriend, personId])

  useEffect(() => {
    if (!threadId) return () => {}
    const messagesChannel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          setMessages((m) => [payload.new as IMessage, ...m])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(messagesChannel)
    }
  }, [threadId])

  const handleSendRequest = useCallback(async () => {
    if (requestData) {
      toast.error('You have already sent a request')
      return
    }
    if (!personId) return

    const { error } = await supabase.rpc('requests_create_new_request', {
      friend_id: personId,
    })

    setIsLoading(false)

    if (error) toast.error(error.message)
    else {
      toast.success('Friend Request Sent')
      setHasSentRequest(true)
    }
  }, [requestData, personId])

  const handleAcceptRequest = useCallback(
    async (accept: boolean) => {
      if (requestData === null) {
        toast.error('Their is no friend request')
        return
      }
      if (!threadId) return

      setIsLoading(true)
      const { error } = await supabase.rpc('requests_handle_friend_request', {
        accept_request: accept,
        t_id: threadId,
      })

      setIsLoading(false)

      if (error) toast.error(error.message)
      else {
        toast.success(`Friend Request ${accept ? 'accepted' : 'rejected'}`)
        setRequestData(null)
        setIsFriend(accept)
      }
    },
    [requestData, setIsFriend, threadId]
  )

  return (
    <div className="flex h-full flex-col-reverse gap-0.5 overflow-y-scroll p-4 scrollbar-none">
      {isFetchingData && (
        <div className="flex w-full justify-center p-4">
          <Spinner />
        </div>
      )}
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isSender={user.id === message.sender_id}
        />
      ))}
      {personId && !isFriend && (
        <p
          className={classNames('flex w-full', {
            'justify-end': requestData?.receiver_id !== userId,
          })}
        >
          <span
            className={classNames(
              'flex w-full max-w-4/5 flex-col gap-2 rounded-2xl p-4 text-sm',
              {
                'bg-secondary text-black': requestData?.receiver_id === userId,
                'bg-darkGreen text-white': requestData?.receiver_id !== userId,
              }
            )}
          >
            Can we be friends ?
            {requestData && requestData.receiver_id === userId ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAcceptRequest(true)}
                  isLoading={isLoading}
                  className="w-1/2 !rounded-lg bg-white py-3 text-darkGreen"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleAcceptRequest(false)}
                  isLoading={isLoading}
                  className="ml-2 w-1/2 !rounded-lg bg-white py-3 text-darkGreen"
                >
                  Refuse
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSendRequest}
                isLoading={isLoading}
                disabled={hasSentRequest}
                className="w-full !rounded-lg bg-white py-3 text-darkGreen"
              >
                Send Request
              </Button>
            )}
          </span>
        </p>
      )}
    </div>
  )
}

export default Messages
