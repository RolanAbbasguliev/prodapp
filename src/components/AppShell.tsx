import { IonApp, IonFooter, IonRouterOutlet, IonToolbar } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { Redirect, Route } from 'react-router-dom'
import Tabs from './pages/Tabs'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ShowProduct from './pages/ShowProduct'
import { useEffect } from 'react'

defineCustomElements(window)

const AppShell = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/* <Redirect from="/" to="/api/auth/signin" exact /> */}
                    <Route path="/" component={Login} exact />
                    <Route
                        path="/registration"
                        component={Registration}
                        exact
                    />
                    <Route path="/app" component={Tabs} />
                    <Route path="/app/show" component={ShowProduct} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default AppShell
