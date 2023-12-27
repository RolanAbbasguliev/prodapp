import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { Route } from 'react-router-dom'
import Tabs from './pages/Tabs'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
defineCustomElements(window)
const AppShell = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route path="/" render={() => <Tabs />} />
                    {/* <Route path="/tabs" render={() => <Tabs />} /> */}
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default AppShell
