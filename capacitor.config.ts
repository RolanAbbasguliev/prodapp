import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'prodapp',
    webDir: 'build_phone',
    bundledWebRuntime: false,
    server: {
        url: 'http://10.0.0.65:3000', //replace your ip -> http://yourip:3000
        cleartext: true,
    },
    plugins: {
        GoogleAuth: {
            scopes: ['profile', 'email'],
            serverClientId:
                '1063431845940-jco9505llvap2tmn4058kc825su62nrt.apps.googleusercontent.com',
            forceCodeForRefreshToken: true,
        },
    },
    // cordova: {
    //     preferences: {
    //         OverrideUserAgent:
    //             'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    //     },
    // },
}

export default config
