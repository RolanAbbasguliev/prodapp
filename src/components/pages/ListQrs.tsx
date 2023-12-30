import Image from 'next/image'

import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
} from '@ionic/react'
import { cameraOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const ListQrs = () => {
    const [imgId, setImgId] = useState([''])
 

    const fetchImg = async () => {}
    useEffect(() => {}, [])
    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">Scanner</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={false}>
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <IonButton>
                                        <QRCodeSVG value="sosi"></QRCodeSVG>
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ListQrs
