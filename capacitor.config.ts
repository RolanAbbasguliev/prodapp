import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'prodapp',
    webDir: 'build_phone',
    bundledWebRuntime: false,
    server: {
        url: 'http://192.168.0.100:3000', //replace your ip -> http://yourip:3000
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
}

export default config
