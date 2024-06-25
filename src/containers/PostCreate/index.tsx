import Image from 'next/image'

import { ChangeEvent, memo, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import { Button, Chevron, Cross, Emoji, Picture, Spinner } from 'components'
import { useAuth } from 'contexts/AuthContext'
import { useCirclesContext } from 'contexts/circlesData'
import { INITIAL_POST_DATA } from 'contexts/postData'
import { usePostsContext } from 'contexts/postsData'
import { supabase } from 'services/supabase'
import { ICircle, IPost } from 'types/supabaseTables'
import { INITIAL_CIRCLE_DATA, Tables } from 'utils/constants'
import { uploadImage } from 'utils/uploadFile'

type IPostCreate = {
  className?: string
}

const PostCreate = ({ className }: IPostCreate) => {
  const [postData, setPostData] = useState<IPost>(INITIAL_POST_DATA)
  const { setPosts } = usePostsContext()
  const [isActive, setIsActive] = useState<boolean>(false)
  const { circles, setCircles } = useCirclesContext()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedCircle, setSelectedCircle] =
    useState<ICircle>(INITIAL_CIRCLE_DATA)

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleInActive = () => {
    setIsActive(false)
    setPostData(INITIAL_POST_DATA)
    setIsSubmitted(false)
    setSelectedCircle(INITIAL_CIRCLE_DATA)
  }

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsActive(true)
    setPostData((data) => ({
      ...data,
      context: e.target.value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]
    if (imgFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setIsActive(true)
        setPostData({
          ...postData,
          post_image_url: reader.result as string,
          imageFile: structuredClone(imgFile),
        })
      }
      reader.readAsDataURL(imgFile)
    }
  }

  const fetchCircles = useCallback(async () => {
    const { data, error } = await supabase.rpc('users_get_user_circles', {
      user_id: user.id,
    })

    if (data) setCircles(data)
    else if (error) toast.error(error.message)
  }, [setCircles, user.id])

  const handleCreatePost = useCallback(async () => {
    setIsLoading(true)
    let filePath: string = ''
    let deleteImage: () => Promise<void> = async () => {}
    if (postData.imageFile) {
      const { url, onDelete } = await uploadImage(
        postData.imageFile,
        'post_images',
        `${Date.now()}`
      )
      filePath = url
      deleteImage = onDelete
    }

    const { data, error } = await supabase.rpc(
      'posts_create_post_with_post_image_url',
      {
        circle_id: selectedCircle.id,
        context: postData.context,
        url: filePath,
      }
    )

    if (error) {
      await deleteImage()
      toast.error(error.message)
      setIsLoading(false)
      return
    }

    const { data: newPost, error: postErr } = await supabase
      .from(Tables.POSTS)
      .select()
      .eq('id', data)
      .single()

    if (postErr) {
      toast.error(postErr.message)
    } else if (data) {
      setPosts((posts) => [
        {
          circle_id: newPost.circle_id,
          context: newPost.context || '',
          created_at: newPost.created_at,
          id: newPost.id,
          created_by: newPost.circle_id,
          post_image_url: newPost.post_image_url || '',
          circle_name: postData.circle_name,
          created_by_user_name: user.user_name || '',
          created_by_user_avatar_url: user.avatar_url || '',
          replies_count: 0,
          likes_count: 0,
          liked: false,
        },
        ...posts,
      ])
      setPostData(INITIAL_POST_DATA)
      toast.success('post created')
    }

    setIsLoading(false)
    handleInActive()
  }, [
    postData.circle_name,
    postData.context,
    postData.imageFile,
    selectedCircle.id,
    setPosts,
    user.avatar_url,
    user.user_name,
  ])

  return (
    <div
      className={classNames(
        'bg-white/9 relative flex w-full max-w-base flex-col gap-2 overflow-hidden rounded-5 bg-white/90',
        className
      )}
    >
      {isActive && (
        <Button
          className="group absolute right-2 top-2 aspect-square items-center !rounded-full bg-black/20 !p-2 duration-300 hover:bg-black"
          onClick={handleInActive}
        >
          <Cross color="white" className="transition-colors" />
        </Button>
      )}
      {postData.post_image_url && (
        <Image
          src={postData.post_image_url}
          width={720}
          height={300}
          alt="post image"
          className="max-h-sm w-full bg-black/60 object-contain"
        />
      )}
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className={classNames('flex w-full items-center gap-x-4', {
          'flex-col items-start': isActive,
        })}
      >
        <div className="flex w-full flex-1 items-start gap-4 p-6">
          {user.avatar_url && (
            <Image
              src={user.avatar_url}
              alt="avatar"
              width={24}
              height={24}
              className="aspect-square translate-y-1 rounded-2.5"
            />
          )}
          <textarea
            value={postData.context || ''}
            className="w-full resize-none bg-transparent text-2xl text-black/90 outline-none scrollbar-thin scrollbar-thumb-transparent scrollbar-track-rounded-full scrollbar-thumb-rounded-full hover:scrollbar-thumb-black/40"
            rows={isActive ? 4 : 1}
            cols={40}
            aria-label="Add content to post"
            placeholder="I have something to say..."
            onChange={handleChangeText}
          />
        </div>
        <div
          className={classNames('flex gap-2.5 px-6', {
            'w-full items-center justify-between border-t border-black/20 py-3':
              isActive,
          })}
        >
          <div className="flex gap-6">
            <label
              htmlFor="post-image"
              title="Post Image"
              className="flex h-6 w-6 cursor-pointer items-center gap-2"
            >
              <Picture />
              <input
                onChange={handleImageChange}
                id="post-image"
                title="Post Image"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
            <Emoji />
          </div>
          {isActive && !isSubmitted && (
            <Button
              onClick={fetchCircles}
              className="items-center !rounded-full border bg-darkGreen text-lg font-bold text-white"
            >
              Circle <Chevron color="white" />
            </Button>
          )}
          {isSubmitted && (
            <Button
              disabled={isLoading}
              onClick={handleCreatePost}
              className={classNames(
                'flex w-max items-center justify-center gap-2 !rounded-full border border-black/5 bg-darkGreen p-2 text-white'
              )}
            >
              {selectedCircle.circle_logo_image && (
                <Image
                  src={selectedCircle.circle_logo_image}
                  alt="circle"
                  width={24}
                  height={24}
                  className="aspect-square h-6 w-6 rounded-full"
                />
              )}
              <p className="overflow-hidden whitespace-nowrap text-sm font-bold capitalize">
                {selectedCircle.name}
              </p>
              <button
                onClick={() => setIsSubmitted(true)}
                type="button"
                className="transition-transform ease-in hover:scale-125"
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Chevron className="-rotate-90" color="white" />
                )}
              </button>
            </Button>
          )}
        </div>
        {isActive && !isSubmitted && (
          <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto p-3 scrollbar-thin">
            {circles.map((circle) => (
              <Button
                onClick={() => setSelectedCircle(circle)}
                key={circle.id}
                className={classNames(
                  'flex w-max items-center justify-center gap-2 !rounded-full border border-black/5 p-2',
                  {
                    'bg-darkGreen text-white': circle.id === selectedCircle.id,
                  }
                )}
              >
                {circle.circle_logo_image && (
                  <Image
                    src={circle.circle_logo_image}
                    alt="circle"
                    width={24}
                    height={24}
                    className="aspect-square h-6 w-6 rounded-full"
                  />
                )}
                <p className="overflow-hidden whitespace-nowrap text-sm font-bold capitalize">
                  {circle.name}
                </p>
                {circle.id === selectedCircle.id && (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    type="button"
                    className="transition-transform ease-in hover:scale-125"
                  >
                    <Chevron className="-rotate-90" color="white" />
                  </button>
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(PostCreate)
