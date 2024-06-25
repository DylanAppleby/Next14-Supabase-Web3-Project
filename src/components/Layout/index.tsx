import dynamic from 'next/dynamic'
// eslint-disable-next-line camelcase
import { Hanken_Grotesk } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ReactNode, useMemo } from 'react'

import classNames from 'classnames'
import Header from 'components/Header'
import { useAuth } from 'contexts/AuthContext'
import { Paths } from 'utils/constants'

const CircleList = dynamic(() => import('containers/CircleList'))
const Login = dynamic(() => import('containers/Login'))

export const HKGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const ProtectedRoutes = [
  Paths.HOME,
  Paths.CIRCLE,
  Paths.CIRCLE_ID,
  Paths.PEOPLE,
  Paths.PEOPLE_ME,
  Paths.PEOPLE_ID,
  Paths.PEOPLE_UPDATE,
  Paths.COMMENT,
  Paths.POLICY,
  Paths.POST_ID,
]

const UnProtectedRoutes = [
  Paths.HOME,
  Paths.CIRCLE,
  Paths.CIRCLE_ID,
  Paths.PEOPLE,
  Paths.PEOPLE_ME,
  Paths.PEOPLE_ID,
  Paths.SIGNIN,
  Paths.SIGNUP,
  Paths.POLICY,
  Paths.POST_ID,
]

export const Nav = ({ children }: { children?: ReactNode }) => (
  <nav
    id="left-nav"
    className="sticky top-0 hidden w-full max-w-[290px] flex-col gap-4 overflow-y-scroll pb-16 pr-4 scrollbar-none md:flex"
  >
    {children || <CircleList />}
  </nav>
)

export const Aside = ({ children }: { children?: ReactNode }) => {
  const { user } = useAuth()
  return (
    <aside
      id="right-aside"
      className="sticky top-0 hidden max-h-screen w-full max-w-99 flex-col gap-4 overflow-y-scroll pb-16 pl-4 scrollbar-none sm:flex"
    >
      {!user.id && <Login />}
      {children}
    </aside>
  )
}

export const Section = ({ children }: { children: ReactNode }) => (
  <section className="flex w-full max-w-2xl flex-col md:max-w-base">
    {children}
  </section>
)

export const Default = ({ children }: { children: ReactNode }) => (
  <>
    <Nav />
    <Section>{children}</Section>
    <Aside />
  </>
)

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { pathname } = router
  const { session } = useAuth()

  const child = useMemo(() => {
    if (
      session &&
      ProtectedRoutes.find((route) => route.startsWith(pathname))
    ) {
      return children
    }
    if (
      !session &&
      UnProtectedRoutes.find((route) => route.startsWith(pathname))
    ) {
      return children
    }

    router.push(Paths.HOME)
    return null
  }, [children, pathname, router, session])

  return (
    <>
      <Head>
        <title>Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main
        id="main"
        className={classNames(
          'flex h-full w-full max-w-lg flex-row overflow-y-scroll scrollbar-none',
          HKGrotesk.className
        )}
      >
        {child}
      </main>
    </>
  )
}

export default Layout
