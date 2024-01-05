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

import AddProduct from './AddProduct'
import ListQrs from './ListQrs'
import Scanner from './Scanner'
import ShowProduct from './ShowProduct'

const Tabs = () => {
    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="addProduct" href="/app/addProduct">
                    <IonIcon icon={addCircle} />
                    <IonLabel>Add</IonLabel>
                </IonTabButton>

                <IonTabButton tab="scanner" href="/app/scanner">
                    <IonIcon icon={qrCodeOutline}></IonIcon>
                    <IonLabel>Scan</IonLabel>
                </IonTabButton>

                <IonTabButton tab="list-qrs" href="/app/list-qrs">
                    <IonIcon icon={listOutline}></IonIcon>
                    <IonLabel>QRCode List</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Redirect path="/app" to="/app/addProduct" exact />

                <Route path="/app/show/:id" component={ShowProduct} exact />

                <Route path="/app/addProduct" component={AddProduct} exact />
                <Route path="/app/scanner" component={Scanner} exact />
                <Route path="/app/list-qrs" component={ListQrs} exact />
            </IonRouterOutlet>
        </IonTabs>
    )
}

export default Tabs
