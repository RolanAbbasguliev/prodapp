import Image from 'next/image'

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
    IonList,
    IonInput,
    IonCard,
    IonCardContent,
    useIonRouter,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
    IonFooter,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { TextFieldTypes } from '../../interfaces/interfaces'
import { logInOutline, logoGoogle, personCircleOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import useToast from '../../hooks/useToast'
import { useSession, signIn } from 'next-auth/react'
import { Browser } from '@capacitor/browser'
import { Preferences } from '@capacitor/preferences'
import { Capacitor } from '@capacitor/core'

const Close = () => {
    return (
        <IonPage>
            <IonCard>
                <IonCardContent className="ion-text-center">
                    Авторизация прошла успешна, можете закрыть текущую вкладку
                </IonCardContent>
            </IonCard>
        </IonPage>
    )
}

export default Close
