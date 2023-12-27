import Image from 'next/image';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';

const Auth = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center">Authorization</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Auth;
