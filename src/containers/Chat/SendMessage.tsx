import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PaperPlane } from 'components'
import { supabase } from 'services/supabase'
import { ChatMessageSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

const SendMessage = ({ personId }: { personId: string }) => {
  const searchParams = useSearchParams()
  const threadId = searchParams.get('thread')
  const router = useRouter()
  const pathname = usePathname()

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(ChatMessageSchema),
    mode: 'onBlur',
    defaultValues: {
      message: '',
    },
  })

  const handlePostMessage = async ({ message }: { message: string }) => {
    let tid: string = threadId || ''
    if (!threadId) {
      const { data, error } = await supabase.rpc('threads_create_new_thread', {
        friend_id: personId,
      })

      if (data) tid = data
      else if (error) toast.error(error.message)
    }

    const { error } = await supabase.rpc('messages_insert_message', {
      content: message,
      thread_id: tid,
      receiver_id: personId,
    })

    if (error) toast.error(error.message)
    else {
      reset({ message: '' })
      if (!threadId) {
        const newParams = new URLSearchParams(searchParams)
        newParams.set(`thread`, tid)
        router.push(`${pathname}?${newParams.toString()}`)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handlePostMessage)}
      className="sticky bottom-0 flex h-16 w-full justify-between gap-2 border-t border-stroke px-4 py-3"
    >
      <label title="Message Box" htmlFor="message-box" className="w-full">
        <input
          {...register('message')}
          id="message-box"
          placeholder="Send a message"
          className="h-10 w-full rounded-lg border-2 border-darkGreen p-2 outline-none"
        />
      </label>
      <button
        type="submit"
        className="flex aspect-square items-center rounded-full bg-darkGreen p-2.5"
      >
        <PaperPlane />
      </button>
    </form>
  )
}

export default SendMessage
