import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import FallbackImage from 'components/FallbackImage'
import { HeartFill, HeartOutlined, Message, Spinner } from 'components/Icons'
import { useAuth } from 'contexts/AuthContext'
import { useQueryParams } from 'hooks/useQueryParam'
import { supabase } from 'services/supabase'
import { IPost } from 'types/supabaseTables'
import { Paths, supabaseStorageUrl } from 'utils/constants'
import timeSince from 'utils/timeSince'

import Content from './Content'
import Options from './Options'

type TPost = { post: IPost; hideCircle?: boolean }

const Post = ({ post, hideCircle }: TPost) => {
  const [isLiked, setIsLiked] = useState<boolean>(post.liked)
  const [likeCount, setLikeCount] = useState<number>(post.likes_count)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPost, setShowPost] = useState<boolean>(true)

  const { set } = useQueryParams()
  const router = useRouter()

  const { user } = useAuth()

  const handleLike = useCallback(async () => {
    if (!user.email) {
      router.push(set('login', 'true'))
      return
    }
    setIsLoading(true)

    const { data: didLike, error } = await supabase.rpc('posts_like_unlike', {
      post_id: post.id,
    })
    setIsLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    if (didLike) setLikeCount((val) => val + 1)
    else setLikeCount((val) => val - 1)

    setIsLiked(didLike)
  }, [post.id, router, set, user.email])

  return (
    <div
      className={classNames(
        'flex w-full max-w-3xl animate-fade flex-col items-start -space-y-4',
        {
          hidden: !showPost,
        }
      )}
    >
      {hideCircle || (
        <div className="z-10 flex items-center gap-2 rounded-r-full rounded-t-full border border-black/10 bg-white p-3 px-6">
          <FallbackImage
            className="aspect-square h-8 w-8 rounded-full"
            src={`${supabaseStorageUrl}/circle_images/${post.circle_id}.jpg`}
            defaultSrc={`${supabaseStorageUrl}/circle_images/default.jpg`}
            width={32}
            height={32}
            alt="Rounded avatar"
          />
          <Link
            href={`${Paths.CIRCLE}/${post.circle_id}`}
            className="text-sm font-semibold text-black/90 hover:underline"
          >
            {post.circle_name}
          </Link>
        </div>
      )}
      <div className="relative w-full space-y-6 overflow-hidden rounded-5 bg-white p-6">
        <div className="relative flex flex-row">
          {post.created_by_user_avatar_url ? (
            <Image
              width={44}
              height={44}
              priority
              alt="user"
              className="aspect-square h-11 w-11 rounded-2xl"
              src={post.created_by_user_avatar_url}
            />
          ) : (
            <div className="h-11 w-11 rounded-2xl bg-lightGray" />
          )}
          <div className="ml-3 flex h-11 flex-col justify-center py-2">
            <Link
              href={`${Paths.PEOPLE}/${post.created_by}`}
              className="text-sm font-bold hover:underline"
            >
              {post.created_by_user_name}
            </Link>
            <div className="text-sm font-bold text-black/40">
              {timeSince(post.created_at)}
            </div>
            {post.created_by === user.id && (
              <Options id={post.id} setShowPost={setShowPost} />
            )}
          </div>
        </div>
        <Content text={post.context} showLinkPreview={!post.post_image_url} />
        {post.post_image_url && (
          <Image
            src={post.post_image_url}
            priority
            alt="post image"
            width={720}
            height={650}
            className="max-h-md rounded-5 object-contain"
          />
        )}
        <div className="mt-4 flex h-10 gap-x-4 text-sm font-bold">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLike}
            className={classNames('flex gap-x-2 rounded-full px-4 py-3', {
              'border border-lightGray': !isLiked,
              'bg-lightPink text-rose': isLiked,
            })}
          >
            {isLiked ? <HeartFill /> : <HeartOutlined />}
            {isLoading ? <Spinner /> : likeCount}
          </button>
          <Link
            href={user.email ? set('postId', post.id) : set('login', 'true')}
            className="flex gap-x-2 rounded-full border border-lightGray px-4 py-3"
          >
            <Message /> {post.replies_count}
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Post
