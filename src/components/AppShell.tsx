import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { Route } from 'react-router-dom'
import Tabs from './pages/Tabs'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import Auth from './pages/Auth'
defineCustomElements(window)
const AppShell = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" render={() => <Auth />} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default AppShell
