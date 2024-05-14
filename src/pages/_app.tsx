import 'leaflet/dist/leaflet.css'

import type { AppProps } from 'next/app'
import { Catamaran } from 'next/font/google'
import Head from 'next/head'

import '#components/Map/leaflet-custom.css'
import '#src/globals.css'

import { SessionProvider } from 'next-auth/react'

import { UserProvider } from '../lib/UserContext'

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: '--font-catamaran',
})

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <SessionProvider session={session}>
      <UserProvider>
        <main className={`${catamaran.variable} font-sans text-base`}>
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </SessionProvider>
  </>
)

export default App
