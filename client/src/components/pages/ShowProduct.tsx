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
    IonImg,
} from '@ionic/react'
import { cameraOutline, scanOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { QRCodeSVG } from 'qrcode.react'

const ShowProduct = () => {
    const [imageId, setImageId] = useState('')
    const [image, setImage] = useState('')

    const downloadImage = async (id: string) => {
        const data = {
            imageId: id,
        }
        const res = await fetch('/api/product/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },

            body: JSON.stringify(data),
        })
        console.log(res.body)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setImage(url)
        console.log(blob)
    }

    useEffect(() => {
        const id = window.location.href.split('/').pop()!
        setImageId(id)
        downloadImage(id)
    }, [])
    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">
                        SHOW PRODUCT
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" scrollY={false}>
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCardContent className="ion-padding">
                                <IonCard className="ion-padding">
                                    {image ? (
                                        <IonImg
                                            style={{
                                                height: '200px',
                                                backgroundImage: 'cover',
                                            }}
                                            src={image}
                                            alt="UPLOADED_PHOTO"
                                        ></IonImg>
                                    ) : (
                                        <h1>Loading</h1>
                                    )}
                                </IonCard>
                            </IonCardContent>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ShowProduct
