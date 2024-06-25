import dynamic from 'next/dynamic'
// eslint-disable-next-line camelcase
import { Hanken_Grotesk } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import classNames from 'classnames'
import { Circles, Compass, PeopleOutlined } from 'components/Icons'
import SearchBar from 'components/SearchBar'
import { useAuth } from 'contexts/AuthContext'
import { usePostsContext } from 'contexts/postsData'
import { Paths } from 'utils/constants'

const Notifications = dynamic(() => import('components/Notifications'))

export const HKGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const Header = () => {
  const { user, session } = useAuth()
  const pathname = usePathname() || ''
  const router = useRouter()
  const { posts } = usePostsContext()

  const searchParams = useSearchParams()
  const handleSearchQuery = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('search', value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <header
      className={classNames(
        'relative mx-auto flex h-17 w-full max-w-lg items-center rounded-5 bg-white px-6 py-1 text-black/90',
        HKGrotesk.className
      )}
    >
      <Link
        href={Paths.HOME}
        className="flex w-full max-w-xs items-center gap-1.5 text-3xl font-bold tracking-tight text-darkGreen"
      >
        <Image alt="logo" src="/logo.png" width={32} height={32} />
        Eden
      </Link>
      <div className="flex h-full w-full max-w-base gap-x-5">
        <Link
          href={Paths.HOME}
          className={classNames(
            'flex h-full items-center gap-x-2 rounded-full px-5 text-lg transition-all duration-300',
            {
              'bg-zinc-200': pathname === Paths.HOME,
            }
          )}
        >
          <Compass /> Discover
        </Link>
        <Link
          href={Paths.CIRCLE}
          className={classNames(
            'flex h-full items-center gap-x-2 rounded-full px-5 text-lg transition-all duration-300',
            {
              'bg-zinc-200': pathname.startsWith(Paths.CIRCLE),
            }
          )}
        >
          <Circles /> Circle
        </Link>
        <Link
          href={Paths.PEOPLE}
          className={classNames(
            'flex h-full items-center gap-x-2 rounded-full px-5 text-lg transition-all duration-300',
            {
              'bg-zinc-200': pathname.startsWith(Paths.PEOPLE),
            }
          )}
        >
          <PeopleOutlined /> People
        </Link>
      </div>
      <div
        className={classNames('flex w-full max-w-sm items-center gap-x-5', {
          'justify-between': session,
          'justify-end': !session,
        })}
      >
        {posts.length > 0 && (
          <SearchBar
            className="!h-10 rounded-full bg-secondary text-xl outline-none transition-width duration-300 ease-in-out"
            placeholder="Search"
            onSearch={handleSearchQuery}
          />
        )}
        {session && (
          <Link
            href={Paths.PEOPLE_ME}
            className="flex items-center gap-2 text-sm font-semibold text-black/60"
          >
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="avatar"
                width={20}
                height={20}
                className="h-7 w-7 rounded-full bg-zinc-200"
              />
            ) : (
              <div className="h-4 w-4 rounded-full bg-zinc-200" />
            )}
            {user.user_name}
          </Link>
        )}
        <Notifications />
      </div>
    </header>
  )
}

export default Header
