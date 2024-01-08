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
    IonInput,
    IonToast,
} from '@ionic/react'
import {
    cameraOutline,
    refreshOutline,
    scanOutline,
    trashOutline,
} from 'ionicons/icons'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { QRCodeSVG } from 'qrcode.react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import useToast from '../../hooks/useToast'

type Product = Record<string, string | number>

const ShowProduct = () => {
    const { toast, setToast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [imageId, setImageId] = useState('')
    const [image, setImage] = useState('')
    const [product, setProduct] = useState<Product>()
    const router = useIonRouter()

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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        setProduct(await productInfo.json())

        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        setImage(url)
    }

    const formFields = [
        {
            label: 'Name',
            name: 'name',
            placeholder: 'Coffe',
            value: '',
        },

        {
            label: 'Description',
            name: 'description',
            placeholder: 'Tasty coffe',
            value: '',
        },
        {
            label: 'Price',
            name: 'price',
            placeholder: '20$',
            isNum: true,
            value: '',
        },
    ]

    const onUpdate = async (data: Record<string, string>) => {
        try {
            if (!(data.name && data.description && data.price)) {
                setToast({
                    message: 'Set new field',
                    isOpen: true,
                    color: 'danger',
                })
                return
            }
            data.imageId = imageId

            const res = await fetch('/api/product', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const message = (await res.json()).message
            setToast({
                message: message,
                isOpen: true,
                color: res.status === 200 ? 'success' : 'danger',
            })
        } catch (e) {
            console.log(e)
        }
    }

    const onDelete = async () => {
        try {
            const data = {
                imageId: imageId,
            }
            const res = await fetch('/api/product', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const message = (await res.json()).message
            setToast({
                message: message,
                isOpen: true,
                color: res.status === 200 ? 'success' : 'danger',
            })

            if (res.status === 200) {
                setTimeout(() => {
                    router.push('/app/list-qrs')
                }, 500)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const id = window.location.href.split('/').pop()!
        setImageId(id)
        downloadImage(id)
    }, [])
    return (
        <>
            <IonHeader id="headerShowProduct">
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
                                        className="ion-padding"
                                        src={image}
                                        alt="UPLOADED_PHOTO"
                                    ></IonImg>
                                ) : (
                                    <h1>Loading</h1>
                                )}
                                <IonCardContent>
                                    <form onSubmit={handleSubmit(onUpdate)}>
                                        {product &&
                                            formFields.map((field, index) => {
                                                return (
                                                    <IonInput
                                                        mode="md"
                                                        key={index}
                                                        type={
                                                            field.isNum
                                                                ? 'number'
                                                                : 'text'
                                                        }
                                                        {...register(
                                                            field.name
                                                        )}
                                                        fill="outline"
                                                        label={field.label}
                                                        className="ion-margin-top"
                                                        placeholder={product[
                                                            `${field.name}`
                                                        ].toString()}
                                                    />
                                                )
                                            })}
                                        <IonButton
                                            type="submit"
                                            size="default"
                                            expand="block"
                                            className="ion-margin-top"
                                        >
                                            Update
                                            <IonIcon
                                                icon={refreshOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                        <IonButton
                                            onClick={onDelete}
                                            color="danger"
                                            size="default"
                                            expand="block"
                                            className="ion-margin-top"
                                        >
                                            Delete
                                            <IonIcon
                                                icon={trashOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    color={toast.color}
                    isOpen={toast.isOpen}
                    message={toast.message}
                    onDidDismiss={() => {
                        setToast({
                            isOpen: false,
                        })
                    }}
                    duration={2000}
                    positionAnchor="headerShowProduct"
                    position="top"
                ></IonToast>
            </IonContent>
        </>
    )
}

export default ShowProduct
