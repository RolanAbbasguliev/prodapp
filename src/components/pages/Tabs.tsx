import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, list, addCircle } from 'ionicons/icons';
import Home from './Home';
import Prouduct from './Prouduct';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" render={() => <Home />} exact={true} />
        <Route path="/tabs/product" render={() => <Prouduct />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab2" href="/tabs/product">
          <IonIcon icon={addCircle} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/feed">
          <IonIcon icon={flash} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
