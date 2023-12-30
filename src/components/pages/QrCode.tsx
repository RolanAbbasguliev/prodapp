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

const QrCode = () => {
    const [scanData, setScanData] = useState('')
    const [scanActive, setScanActive] = useState(false)

    const hideBackgroundMe = () => {
        document.querySelector('body')?.classList.add('scanner-active')
    }

    const showBackground = () => {
        document.querySelector('body')?.classList.remove('scanner-active')
    }
    const startScan = async () => {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true })

        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        BarcodeScanner.hideBackground()
        hideBackgroundMe()

        const result = await BarcodeScanner.startScan() // start scanning and wait for a result
        setScanActive(true)

        // if the result has content
        if (result.hasContent) {
            setScanData(result.content)
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
                    {scanActive ? (
                        <IonButton onClick={stopScan}>Stop Scan</IonButton>
                    ) : (
                        ''
                    )}
                </IonToolbar>
            </IonHeader>
            {scanActive ? (
                ''
            ) : (
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
                                                icon={cameraOutline}
                                                slot="end"
                                            ></IonIcon>
                                        </IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            )}
        </>
    )
}

export default QrCode
