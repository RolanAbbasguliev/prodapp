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
            setS3ImgArr(await res.json())
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchImg()
    }, [])
    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">Scanner</IonTitle>
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
                                            <IonCardContent className=" ion-text-center    ">
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
                                    <h1>SOSIi</h1>
                                    <IonCardContent>No Product</IonCardContent>
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
