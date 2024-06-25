import { ChangeEvent, memo, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'

type ICommentForm = {
  parentId: string
  isReplyToPost: boolean
  fetchComments: () => void
  setIsLoading: (val: boolean) => void
}

const CommentForm = ({
  parentId,
  isReplyToPost,
  fetchComments,
  setIsLoading,
}: ICommentForm) => {
  const [commentData, setCommentData] = useState<string>('')
  const { user } = useAuth()

  const handleContentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setCommentData(e.target.value)
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    if (!user.email) return
    setIsLoading(true)
    const { error } = await supabase.rpc('replies_make_reply', {
      context: commentData,
      reply_to: parentId,
      reply_to_post: isReplyToPost,
    })

    setIsLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    fetchComments()
  }, [
    commentData,
    fetchComments,
    isReplyToPost,
    parentId,
    setIsLoading,
    user.email,
  ])

  return (
    <form
      className="relative inline-block w-full"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit()
      }}
    >
      <input
        value={commentData}
        className={classNames(
          'h-12 w-full resize-none break-words rounded-xl bg-black/5 pl-4 pr-15 text-base leading-5 outline-none',
          {
            'text-black/40': !commentData,
            'text-black': commentData,
          }
        )}
        aria-label="Add comment"
        placeholder="What's your opinion..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentChange(e)}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}
        className="absolute right-5 top-[15px] cursor-pointer text-base font-semibold leading-5 text-black/90"
      >
        Send
      </button>
    </form>
  )
}

export default memo(CommentForm)
