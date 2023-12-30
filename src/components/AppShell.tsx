import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { Redirect, Route } from 'react-router-dom'
import Tabs from './pages/Tabs'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import Login from './pages/Login'
import Registration from './pages/Registration'

import Product from './pages/Product'
import QrCode from './pages/QrCode'
defineCustomElements(window)
const AppShell = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" component={Login} exact />
                    <Route
                        path="/registration"
                        component={Registration}
                        exact
                    />
                    <Route path="/app" component={Tabs} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default AppShell
