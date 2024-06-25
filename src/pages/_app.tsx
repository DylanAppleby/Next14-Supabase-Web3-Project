/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from 'next/dynamic'

import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

import 'styles/globals.css'

import { Layout, LoadingPage } from 'components'
import { Default } from 'components/Layout'
import Context from 'contexts'
import { AppPropsWithLayout } from 'types/model'

const Auth = dynamic(() => import('containers/Auth'))

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Default>{page}</Default>)

  return (
    <Context>
      <Suspense fallback={<LoadingPage />}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </Suspense>
      <Auth />
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: '1.25rem',
          right: '1.25rem',
        }}
      />
    </Context>
  )
}

export default App
