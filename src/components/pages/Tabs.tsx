import { Redirect, Route } from 'react-router-dom'
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react'

import { addCircle, qrCodeOutline } from 'ionicons/icons'

import Product from './Product'
import QrCode from './QrCode'

const Tabs = () => {
    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="product" href="/app/product">
                    <IonIcon icon={addCircle} />
                    <IonLabel>Add</IonLabel>
                </IonTabButton>

                <IonTabButton tab="qrcode" href="/app/qrcode">
                    <IonIcon icon={qrCodeOutline}></IonIcon>
                    <IonLabel>Scan</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Redirect path="/app" to="/app/product" exact />

                <Route path="/app/product" component={Product} exact />
                <Route path="/app/qrcode" component={QrCode} exact />
            </IonRouterOutlet>
        </IonTabs>
    )
}

export default Tabs
