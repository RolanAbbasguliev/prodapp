import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="google-signin-client_id"
                    content="1063431845940-jco9505llvap2tmn4058kc825su62nrt.apps.googleusercontent.com"
                />
                <meta name="google-signin-scope" content="profile email" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
