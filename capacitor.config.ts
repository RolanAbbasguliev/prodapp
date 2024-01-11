import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'prodapp',
    webDir: 'build_phone',
    bundledWebRuntime: false,
    server: {
        url: 'http://192.168.0.104:3000', //replace your ip -> http://yourip:3000
        cleartext: true,
    },
    // cordova: {
    //     preferences: {
    //         OverrideUserAgent:
    //             'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    //     },
    // },
}

export default config
