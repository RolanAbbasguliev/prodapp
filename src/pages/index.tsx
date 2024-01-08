import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const App = dynamic(() => import('../components/AppShell'), {
    ssr: false,
})

export default function Index() {
    return <App />
}
