/* eslint-disable no-underscore-dangle */
import Image from 'next/image'

import { FC, memo, ReactElement, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import { HeartFill, HeartOutlined, Message, Spinner } from 'components/Icons'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { IReplies } from 'types/supabaseTables'

import CommentForm from './CommentForm'

interface ICommentItem {
  commentData: IReplies
  isReplyToPost?: boolean
  isEditable?: boolean
  setIsEditable?: (val: string) => void
}

const CommentItem: FC<ICommentItem> = ({
  commentData,
  isReplyToPost,
  isEditable,
  setIsEditable,
}): ReactElement => {
  const [subCommentList, setSubCommentList] = useState<IReplies[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(
    commentData.liked_count || 0
  )
  const [isLiked, setIsLiked] = useState<boolean>(commentData.liked)

  const { user } = useAuth()

  const {
    created_by_user_name: userName,
    context,
    id,
    reply_count: replyCount,
    created_by_user_avatar_url: avatarUrl,
  } = commentData

  const handleSubComment = useCallback(async () => {
    if (!setIsEditable) return
    if (isEditable) {
      setIsEditable('')
      return
    }

    if (subCommentList.length > 0) {
      setIsEditable(id)
      return
    }

    setIsLoading(true)
    const { data, error } = await supabase.rpc(
      'replies_get_second_level_replies',
      {
        post_id: id,
      }
    )

    if (error) toast.error(error.message)
    else if (data) {
      setSubCommentList(data)
      setIsEditable(id)
    }
    setIsLoading(false)
  }, [id, isEditable, setIsEditable, subCommentList.length])

  const handleLike = useCallback(async () => {
    if (!user.email) return
    setIsLiking(true)
    const { data: didLike, error } = await supabase.rpc('replies_like_unlike', {
      reply_id: id,
    })
    setIsLiking(false)
    if (error) {
      toast.error(error.message)
      return
    }

    if (didLike) setLikeCount((val) => val + 1)
    else setLikeCount((val) => val - 1)

    setIsLiked(didLike)
  }, [id, user.email])

  return (
    <div
      className={classNames('relative flex items-start gap-2', {
        'border-b border-b-black/5 pb-4': isReplyToPost,
        'pt-2': !isReplyToPost,
      })}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="profile"
          className="h-6 w-6 overflow-hidden rounded-full"
          height={24}
          width={24}
        />
      ) : (
        <div className="h-6 w-6 overflow-hidden rounded-full bg-lightGray" />
      )}
      <div
        className={classNames('mt-1 flex w-[calc(100%-32px)] flex-col gap-2', {
          'pb-12': isEditable,
          'pb-4 last:pb-0': !isEditable,
        })}
      >
        <div className="w-full break-words text-base font-semibold leading-5 text-black/90">
          {userName}:<span className="pl-1 font-medium">{context}</span>
        </div>
        <div className="flex gap-7">
          <button
            type="button"
            disabled={isLiking}
            onClick={handleLike}
            className="flex items-center gap-2 text-sm"
          >
            {isLiked ? <HeartFill /> : <HeartOutlined />}
            <span className="mt-0.5">{likeCount}</span>
          </button>
          {isReplyToPost && (
            <button
              className="flex items-center gap-2 text-sm"
              type="button"
              onClick={handleSubComment}
            >
              {isLoading ? <Spinner className="opacity-40" /> : <Message />}
              <span className="mt-0.5">{replyCount}</span>
            </button>
          )}
        </div>
        {isEditable &&
          subCommentList.map((reply) => (
            <CommentItem commentData={reply} key={reply.id} />
          ))}
      </div>
      {isEditable && (
        <div className="absolute bottom-2 w-full">
          <CommentForm
            parentId={id}
            isReplyToPost={false}
            fetchComments={handleSubComment}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
    </div>
  )
}

export default memo(CommentItem)
