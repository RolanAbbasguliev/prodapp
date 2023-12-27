import {
    IonApp,
    IonLabel,
    IonRouterOutlet,
    setupIonicReact,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { Route } from 'react-router-dom'
import Tabs from './pages/Tabs'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import Auth from './pages/Auth'

setupIonicReact({})
defineCustomElements(window)

const AppShell = () => {
    // const [authorized, setAuthorized] = useState(false);
    // useEffect(() => {
    //   (async () => {
    //     const data = await Preferences.get({ key: 'token' });
    //     if (data.value === null) {
    //       await Preferences.set({ key: 'token', value: 'tokenenene' });
    //     } else {
    //       console.log(await Preferences.get({ key: 'token' }), 'THIS IS TOKEN');
    //     }
    //   })();
    // }, []);
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route path="/" render={() => <Auth />} />
                    <Route path="/tabs" render={() => <Tabs />} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default AppShell
