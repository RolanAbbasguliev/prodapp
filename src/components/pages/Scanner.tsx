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
    useIonRouter,
} from '@ionic/react'
import { cameraOutline, scanOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'

const Scanner = () => {
    const [scanActive, setScanActive] = useState(false)

    const router = useIonRouter()

    const hideBackgroundMe = () => {
        document.querySelector('body')?.classList.add('scanner-active')
    }

    const showBackground = () => {
        document.querySelector('body')?.classList.remove('scanner-active')
    }

    const startScan = async () => {
        setScanActive(true)
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true })

        BarcodeScanner.hideBackground()
        hideBackgroundMe()

        const result = await BarcodeScanner.startScan() // start scanning and wait for a result

        if (result.hasContent) {
            router.push(`/app/show/${result.content}`)
        }
    }

    const stopScan = () => {
        showBackground()
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
        setScanActive(false)
    }

    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">Scanner</IonTitle>

                    <IonButton
                        slot="end"
                        onClick={stopScan}
                        size="default"
                        color="light"
                        style={{
                            display: scanActive ? 'block' : 'none',
                        }}
                    >
                        Stop Scan
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" scrollY={false}>
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <IonButton
                                        expand="block"
                                        size="large"
                                        type="submit"
                                        className="ion-margin-top"
                                        style={{
                                            display: scanActive
                                                ? 'none'
                                                : 'block',
                                        }}
                                        onClick={startScan}
                                    >
                                        Start Scan
                                        <IonIcon
                                            icon={scanOutline}
                                            slot="end"
                                        ></IonIcon>
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

export default Scanner
