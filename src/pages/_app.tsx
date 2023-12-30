import '@/styles/globals.css'
import Head from 'next/head'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css' // Remove if nothing is visible
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import '@/themes/variables.css'

import { setupIonicReact } from '@ionic/react'

setupIonicReact()

import NonSSRWrapper from '../components/NoSSRWrapper'
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Native app</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NonSSRWrapper>
                <Component {...pageProps} />
            </NonSSRWrapper>
        </>
    )
}

export default App
