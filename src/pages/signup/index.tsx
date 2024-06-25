import Head from 'next/head'

import { Suspense } from 'react'

import { LoadingPage } from 'components'
import { Register } from 'containers'

const SignUp = () => {
  return (
    <>
      <Head>
        <title>SignUp | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Suspense fallback={<LoadingPage />}>
        <Register />
      </Suspense>
    </>
  )
}
export default SignUp
