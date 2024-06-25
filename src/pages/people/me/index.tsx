import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'

import {
  ArrowBack,
  CircleCard,
  LoadingPage,
  ProfileCard,
  Tabs,
} from 'components'
import { Aside, Nav, Section } from 'components/Layout'
import { PostList } from 'containers'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { NextPageWithLayout } from 'types/model'
import { ICircle } from 'types/supabaseTables'
import { Paths } from 'utils/constants'

const CircleList = () => {
  const [circles, setCircles] = useState<ICircle[]>([])
  const { user } = useAuth()

  const fetchCircles = useCallback(async () => {
    if (!user.id) return

    const { data, error } = await supabase.rpc('users_get_user_circles', {
      user_id: user.id,
    })

    if (error) toast.error(error.message)

    if (data) setCircles(data)
  }, [user.id])

  const circleList = useMemo(
    () =>
      circles.map((circle) => <CircleCard key={circle.id} circle={circle} />),
    [circles]
  )

  useEffect(() => {
    fetchCircles()
  }, [fetchCircles])

  return <div className="flex flex-wrap gap-5">{circleList}</div>
}

const Profile: NextPageWithLayout = () => {
  const tab = useSearchParams().get('tab')

  const { user, signOut } = useAuth()

  const fetchPosts = useCallback(
    async (
      count: number,
      since: string,
      endBefore?: string,
      search?: string
    ) => {
      if (!user.id) return { data: [], error: null }
      const query = supabase.rpc(
        'posts_get_posts_by_user_id',
        {
          user_id: user.id,
          since,
          count,
        },
        endBefore ? { count: 'exact' } : {}
      )

      if (search) query.ilike('context', `%${search}%`)
      if (endBefore) query.gt('created_at', endBefore)

      const { data, error, count: postCount } = await query
      return { data, error, count: postCount }
    },
    [user.id]
  )

  return (
    <>
      <Head>
        <title>Profile | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Suspense fallback={<LoadingPage />}>
        <ProfileCard user={user} signOut={signOut} />
        <Tabs tabs={['posts', 'circles']}>
          {tab === 'circles' ? (
            <CircleList />
          ) : (
            <PostList fetchPosts={fetchPosts} />
          )}
        </Tabs>
      </Suspense>
    </>
  )
}

Profile.getLayout = (page: ReactElement) => (
  <>
    <Nav>
      <Link
        href={Paths.HOME}
        className="flex h-min w-max items-center gap-1 rounded-xl bg-black/10 p-2 text-sm font-bold text-black/90"
      >
        <ArrowBack />
        Back
      </Link>
    </Nav>
    <Section>{page}</Section>
    <Aside />
  </>
)

export default Profile
