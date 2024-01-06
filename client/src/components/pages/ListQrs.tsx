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
import { cameraOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const ListQrs = () => {
    const [s3imgArr, setS3ImgArr] = useState<string[]>()
    const router = useIonRouter()

    const fetchImg = async () => {
        try {
            const res = await fetch('/api/product')
            const json = await res.json()
            if (json.length > 0) {
                setS3ImgArr(json)
            }

            console.log('WTF')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log('render')
    })

    useEffect(() => {
        fetchImg().then(() => console.log(s3imgArr))
    }, [])
    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">QRCode List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center ">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            {s3imgArr ? (
                                s3imgArr.map((id) => {
                                    return (
                                        <IonCard
                                            onClick={() =>
                                                router.push(`/app/show/${id}`)
                                            }
                                            key={id}
                                            className="ion-text-center ion-margins"
                                        >
                                            <IonCardContent className="ion-text-center">
                                                <QRCodeSVG
                                                    value={id}
                                                ></QRCodeSVG>
                                                <h1 className="ion-padding">
                                                    SCAN ME
                                                </h1>
                                            </IonCardContent>
                                        </IonCard>
                                    )
                                })
                            ) : (
                                <IonCard>
                                    <IonCardContent className="ion-text-center">
                                        PRODUCT NOT FOUND
                                    </IonCardContent>
                                </IonCard>
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ListQrs
