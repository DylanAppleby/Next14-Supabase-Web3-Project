import Head from 'next/head'
import { useParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Post, PostSkeleton } from 'components'
import { INITIAL_POST_DATA } from 'contexts/postData'
import { supabase } from 'services/supabase'
import { IPost } from 'types/supabaseTables'

const PostPage = () => {
  const [postData, setPostData] = useState<IPost>(INITIAL_POST_DATA)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams() as { id: string }

  const fetchPost = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .rpc('posts_get_posts_by_id', {
        post_id: id,
      })
      .single()
    setIsLoading(false)

    if (data) setPostData(data)
    else if (error) toast.error(error.message)
  }, [id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (isLoading) return <PostSkeleton />

  return (
    <>
      <Head>
        <title>Post | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {postData.id ? <Post post={postData} /> : <h1>Error Loading the Post</h1>}
    </>
  )
}

export default PostPage
