import type { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Layout } from '../src/components/Layout/Layout'

import store, { persistor } from '../src/redux/store'

import 'react-datepicker/dist/react-datepicker.css'
import 'styles/globals.scss'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation(['meta'])

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Layout>
          <Head>
            <meta
              name='keywords'
              content={t('meta:keywords.general') ?? ''}
            />

            <meta
              name='description'
              content={t('meta:descriptions.general') ?? ''}
            />

            <title>{t('meta:titles.general')}</title>
          </Head>
          <Component {...pageProps} />
          <Toaster
            position='bottom-center'
            reverseOrder={false}
            toastOptions={{
              style: {
                padding: '0',
                margin: '0',
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: ' 0px 0px 15px 0px $box-shadow-alert',
              },
            }}
          />
        </Layout>
      </Provider>
    </PersistGate>
  )
}

export default appWithTranslation(MyApp)
