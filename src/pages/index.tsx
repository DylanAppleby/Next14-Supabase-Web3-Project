import Head from 'next/head'

import { ReactElement, Suspense, useCallback } from 'react'

import { LoadingPage } from 'components'
import { Aside, Nav, Section } from 'components/Layout'
import { PageProfile, PostList, Social } from 'containers'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { NextPageWithLayout } from 'types/model'

const Home: NextPageWithLayout = () => {
  const { user } = useAuth()

  const fetchPosts = useCallback(
    async (
      count: number,
      since: string,
      endBefore?: string,
      search?: string
    ) => {
      const query =
        user.id && !search
          ? supabase.rpc(
              'get_recommended_posts',
              { since, count },
              endBefore ? { count: 'exact' } : {}
            )
          : supabase.rpc(
              'posts_get_search_posts',
              { since, count, circlelist: [], searchtext: search || '' },
              endBefore ? { count: 'exact' } : {}
            )

      if (endBefore) query.gt('created_at', endBefore)

      const { data, error, count: postCount } = await query
      return { data, error, count: postCount }
    },
    [user.id]
  )

  return (
    <>
      <Head>
        <title>Home | Edenverse</title>
        <meta
          name="description"
          content="Eden aims to create the first ever knowledge metaverse on the
          blockchain. Leveraging decentralization, Eden gives data ownership
          back to the users, and is a safe haven for authentic social
          interactions. Back your claims with our token, make predictions on our
          platform, and express your true freedom of speech. Immutable, honest,
          sovereign: on Eden, your internet footprint belongs to you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

Home.getLayout = (page: ReactElement) => (
  <>
    <Nav />
    <Section>{page}</Section>
    <Aside>
      <PageProfile />
      <Social />
    </Aside>
  </>
)

export default Home
