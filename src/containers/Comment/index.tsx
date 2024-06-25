/* eslint-disable no-underscore-dangle */
import { useRouter } from 'next/router'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { CommentForm, CommentItem, Spinner } from 'components'
import Modal from 'containers/Modal'
import { supabase } from 'services/supabase'
import { IReplies } from 'types/supabaseTables'

const Comment = () => {
  const router = useRouter()
  const { query } = router
  const { postId } = query as { postId: string }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<IReplies[]>([])
  const [isEditable, setIsEditable] = useState<string>('')

  const handleIsEditable = useCallback((val: string) => {
    setIsEditable(val)
  }, [])

  const fetchComments = useCallback(async () => {
    if (!postId) return

    setIsLoading(true)
    const { data, error } = await supabase.rpc(
      'replies_get_top_level_replies',
      {
        post_id: postId,
      }
    )

    if (error) toast.error(error.message)
    if (data) {
      setCommentList(data)
    }
    setIsLoading(false)
  }, [postId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments, postId])

  const handleBlur = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Modal showModal={!!postId} onClose={handleBlur} title="Comments">
      <div className="flex h-[582px] w-[440px] flex-col justify-between py-4">
        <div className="flex h-full w-full flex-col gap-4 overflow-y-auto overflow-x-hidden pb-4">
          {!isLoading ? (
            <>
              {commentList.map((comment) => (
                <CommentItem
                  setIsEditable={handleIsEditable}
                  isEditable={comment.id === isEditable}
                  isReplyToPost
                  commentData={comment}
                  key={comment.id}
                />
              ))}
              {commentList.length === 0 && (
                <span className="flex h-full items-center justify-center font-medium">
                  No Comments
                </span>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
        <CommentForm
          parentId={postId}
          isReplyToPost
          fetchComments={fetchComments}
          setIsLoading={setIsLoading}
        />
      </div>
    </Modal>
  )
}

export default Comment
