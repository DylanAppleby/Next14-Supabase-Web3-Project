import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import classNames from 'classnames'
import { Post, PostSkeleton } from 'components'
import Comment from 'containers/Comment'
import Login from 'containers/Login'
import Modal from 'containers/Modal'
import PostCreate from 'containers/PostCreate'
import { useAuth } from 'contexts/AuthContext'
import { usePostsContext } from 'contexts/postsData'
import { useQueryParams } from 'hooks/useQueryParam'
import { IPost } from 'types/supabaseTables'

import { PostgrestError } from '@supabase/supabase-js'

type TPostList = {
  hideCircle?: boolean
  fetchPosts: (
    count: number,
    since: string,
    endBefore?: string,
    search?: string
  ) => Promise<{
    data: IPost[] | null
    error: PostgrestError | null
    count?: number | null
  }>
}

const PostList = ({ hideCircle, fetchPosts }: TPostList) => {
  const [lastDate, setLastDate] = useState<string>(new Date().toISOString())
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { posts, setPosts } = usePostsContext()
  const pathname = usePathname() || ''
  const observer = useRef<IntersectionObserver | null>(null)
  const createPostObserver = useRef<IntersectionObserver | null>(null)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const { user } = useAuth()

  const searchParams = useSearchParams()

  const showLogin = searchParams.get('login')

  const { deleteParam } = useQueryParams()
  const router = useRouter()

  // const [response, setResponse] = useState<number | null>(null) // TODO Add Show More Button
  const [startDate, setStartDate] = useState<string | null>(null)

  const handleGetRecent = useCallback(async () => {
    if (isSearching || !startDate) return

    const { data, error } = await fetchPosts(
      15,
      new Date(Date.now()).toISOString(),
      startDate
    )

    if (error) {
      toast.error(error.message)
    } else if (data) {
      setPosts((val) => [...data, ...val])
    }
    // setResponse(count)
  }, [fetchPosts, isSearching, setPosts, startDate])

  useEffect(() => {
    handleGetRecent()

    const intervalId = setInterval(handleGetRecent, 60000) // Fetch data every 5 mins

    return () => clearInterval(intervalId) // Clean up on unmount
  }, [handleGetRecent])

  useEffect(() => {
    setPosts([])
    setHasMore(true)
  }, [pathname, setPosts])

  useEffect(() => {
    if (posts.length > 0) setStartDate(posts[0].created_at)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length])

  const handleFetch = useCallback(async () => {
    if (isSearching) return
    const { data, error } = await fetchPosts(10, lastDate)

    if (error) {
      toast.error(error.message)
      setHasMore(false)
    } else if (data) {
      if (data.length < 10) setHasMore(false)
      if (data.length > 0) {
        setLastDate(data[data.length - 1].created_at)
        setPosts((list) => {
          if (list.length > 0) data.shift()
          if (list[list.length - 1]?.id !== data[data.length - 1]?.id)
            return [...list, ...data]
          return list
        })
      }
    }
  }, [fetchPosts, isSearching, lastDate, setPosts])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleFetch()
        }
      })
      if (node) observer.current.observe(node)
    },
    [handleFetch, hasMore]
  )

  const postList = useMemo(
    () =>
      posts.map((post) => (
        <Post key={post.id} post={post} hideCircle={hideCircle} />
      )),
    [hideCircle, posts]
  )

  const handleSearch = useCallback(
    async (search: string | null) => {
      if (!search) {
        setIsSearching(false)
        return
      }
      setIsSearching(true)
      setPosts([])
      setHasMore(true)
      const { data, error } = await fetchPosts(
        15,
        new Date(Date.now()).toISOString(),
        undefined,
        search
      )
      setHasMore(false)
      if (data) setPosts(data)
      else if (error) toast.error(error.message)
    },
    [fetchPosts, setHasMore, setIsSearching, setPosts]
  )

  const [isFloating, setIsFloating] = useState(false)

  const handlefloatComponent = useCallback((node: HTMLDivElement) => {
    if (createPostObserver.current) createPostObserver.current.disconnect()
    createPostObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsFloating(false)
      else setIsFloating(true)
    })
    if (node) createPostObserver.current.observe(node)
  }, [])

  useEffect(() => {
    handleSearch(searchParams.get('search'))
  }, [handleSearch, searchParams])

  return (
    <>
      <div className="flex flex-col gap-4 pb-32">
        <PostCreate
          className={classNames('transition-opacity duration-300', {
            '!fixed top-24 z-20 !bg-white/20 backdrop-blur-xl': isFloating,
          })}
        />
        <div ref={handlefloatComponent} className="h-0 w-full max-w-base" />
        {postList}
        {hasMore && <PostSkeleton ref={lastPostElementRef} />}
      </div>
      <Comment />
      <Modal
        showModal={!!showLogin && !user.id}
        onClose={() => router.push(deleteParam('login'))}
      >
        <div className="flex min-w-95 flex-col gap-5">
          <Login />
        </div>
      </Modal>
    </>
  )
}

export default PostList
