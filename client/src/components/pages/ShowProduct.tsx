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
    IonCardHeader,
    IonCardTitle,
} from '@ionic/react'
import { cameraOutline, scanOutline } from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { QRCodeSVG } from 'qrcode.react'

interface Product {
    id: number
    name: string
    description: string
    price: number
    s3ImageId: string
    createId: number
}

const ShowProduct = () => {
    const [imageId, setImageId] = useState('')
    const [image, setImage] = useState('')
    const [product, setProduct] = useState<Product>()

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

        const productInfo = await fetch('/api/product/info', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        setProduct(await productInfo.json())

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setImage(url)
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
                            <IonCard>
                                {image && product ? (
                                    <IonImg
                                        style={{
                                            height: '200px',
                                            backgroundImage: 'cover',
                                        }}
                                        className="ion-margin-top"
                                        src={image}
                                        alt="UPLOADED_PHOTO"
                                    ></IonImg>
                                ) : (
                                    <h1>Loading</h1>
                                )}
                                <IonCardHeader>
                                    <IonCardTitle>
                                        Name: {product?.name}
                                    </IonCardTitle>
                                    <IonCardTitle>
                                        Description: {product?.description}
                                    </IonCardTitle>
                                    <IonCardTitle>
                                        Price: {product?.price}
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent className="ion-padding"></IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default ShowProduct
