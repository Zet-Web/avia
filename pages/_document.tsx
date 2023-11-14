import type { DocumentProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import i18nextConfig from '../next-i18next.config'

type Props = DocumentProps & {
  // add custom document props
}

class MyDocument extends Document<Props> {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ??
      i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet='utf-8' />
          <link
            rel='shortcut icon'
            href='/assets/favicons/favicon.ico'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/assets/favicons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/assets/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/assets/favicons/favicon-16x16.png'
          />
          <link
            rel='manifest'
            href='/assets/favicons/site.webmanifest'
          />
          <link
            rel='mask-icon'
            href='/assets/favicons/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
          <link
            rel='preconnect'
            href='https://fonts.googleapis.com'
          />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
