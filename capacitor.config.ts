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
}

export default config
