import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'prodapp',
    webDir: 'build_phone',
    bundledWebRuntime: false,
    server: {
        url: process.env.HOST_IP,
        cleartext: true,
    },
}

export default config
