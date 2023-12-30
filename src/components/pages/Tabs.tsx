import { Redirect, Route } from 'react-router-dom'
import {
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react'

import { addCircle, listOutline, qrCodeOutline } from 'ionicons/icons'

import Product from './Product'
import QrCode from './QrCode'
import ListQrs from './ListQrs'

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

                <IonTabButton tab="list-qrs" href="/app/list-qrs">
                    <IonIcon icon={listOutline}></IonIcon>
                    <IonLabel>QRCode List</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Redirect path="/app" to="/app/product" exact />

                <Route path="/app/product" component={Product} exact />
                <Route path="/app/qrcode" component={QrCode} exact />
                <Route path="/app/list-qrs" component={ListQrs} exact />
            </IonRouterOutlet>
        </IonTabs>
    )
}

export default Tabs
