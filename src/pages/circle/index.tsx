import Head from 'next/head'

import { ReactElement, Suspense, useCallback } from 'react'

import { LoadingPage } from 'components'
import { Aside, Nav, Section } from 'components/Layout'
import { PageProfile, PostList } from 'containers'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { NextPageWithLayout } from 'types/model'

const Circle: NextPageWithLayout = () => {
  const { user } = useAuth()

  const fetchPosts = useCallback(
    async (
      count: number,
      since: string,
      endBefore?: string,
      search?: string
    ) => {
      if (!user.id) return { data: [], error: null }
      const query = supabase.rpc(
        'posts_get_search_posts',
        {
          circlelist: user.circles,
          count,
          since,
          searchtext: search || '',
        },
        endBefore ? { count: 'exact' } : {}
      )

      if (endBefore) query.gt('created_at', endBefore)

      const { data, error, count: postCount } = await query
      return { data, error, count: postCount }
    },
    [user.circles, user.id]
  )

  return (
    <>
      <Head>
        <title>Circle | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Suspense fallback={<LoadingPage />}>
        <PostList fetchPosts={fetchPosts} />
      </Suspense>
    </>
  )
}

Circle.getLayout = (page: ReactElement) => (
  <>
    <Nav />
    <Section>{page}</Section>
    <Aside>
      <PageProfile />
    </Aside>
  </>
)

export default Circle
