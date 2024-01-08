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
}

export default config
