import Head from 'next/head'
import Link from 'next/link'

import { ReactElement, Suspense } from 'react'

import { ArrowBack, LoadingPage } from 'components'
import { Aside, Nav, Section } from 'components/Layout'
import { UpdatePassword, UpdateProfile } from 'containers'
import { NextPageWithLayout } from 'types/model'
import { Paths } from 'utils/constants'

const UpdateInfo: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Update | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Suspense fallback={<LoadingPage />}>
        <UpdateProfile />
      </Suspense>
    </>
  )
}

UpdateInfo.getLayout = (page: ReactElement) => (
  <>
    <Nav>
      <Link
        href={Paths.PEOPLE_ME}
        className="flex h-min w-max items-center gap-1 rounded-xl bg-black/10 p-2 text-sm font-bold text-black/90"
      >
        <ArrowBack />
        Back
      </Link>
    </Nav>
    <Section>{page}</Section>
    <Aside>
      <UpdatePassword />
    </Aside>
  </>
)

export default UpdateInfo
