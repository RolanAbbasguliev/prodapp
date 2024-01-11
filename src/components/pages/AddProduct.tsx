import {
    IonActionSheet,
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToast,
    IonToolbar,
    useIonRouter,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { Camera, CameraResultType } from '@capacitor/camera'

import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import { documentOutline, downloadOutline, imagesOutline } from 'ionicons/icons'
import useToast from '../../hooks/useToast'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'

const AddProduct = () => {
    const { toast, setToast } = useToast()
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const router = useIonRouter()

    const [photo, setPhoto] = useState('')

    const uploadPhoto = async () => {
        try {
            setError('')
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64,
            })

            const img = `data:image/jpeg;base64, ${image.base64String}`

            setPhoto(img)
        } catch (e) {
            console.log(e)
        }
    }
    const onSubmit = async (data: Record<string, string>) => {
        try {
            if (!photo) {
                setError('*Upload photo is required')
                return
            }
            setError('')

            const buffer = Buffer.from(photo.substring(photo.indexOf(',') + 1))
            if (buffer.length / 1e6 > 4) {
                setPhoto('')
                setToast({
                    isOpen: true,
                    message: 'Photo size exceeded',
                    color: 'danger',
                })
                return
            }

            data.image = photo

            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
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

    const formFields = [
        {
            label: 'Name',
            name: 'name',
            placeholder: 'Coffe',
        },

        {
            label: 'Description',
            name: 'description',
            placeholder: 'Cappuccino',
        },
        {
            label: 'Price',
            name: 'price',
            placeholder: '20$',
            isNum: true,
        },
    ]

    const out = async () => {
        await signOut({
            redirect: false,
        })
        router.push('/')
    }

    return (
        <>
            <IonHeader id="headerAddProduct">
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">
                        Create Poroduct
                    </IonTitle>
                    <IonButton slot="end" onClick={out}>
                        SIGN OUT
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={false}>
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {formFields.map((field, index) => {
                                            return (
                                                <div key={index}>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name={field.name}
                                                        render={({
                                                            message,
                                                        }) => (
                                                            <p
                                                                style={{
                                                                    color: 'red',
                                                                    marginTop:
                                                                        '5px',
                                                                }}
                                                            >
                                                                {message}
                                                            </p>
                                                        )}
                                                    />
                                                    <IonInput
                                                        mode="md"
                                                        type={
                                                            field.isNum
                                                                ? 'number'
                                                                : 'text'
                                                        }
                                                        {...register(
                                                            field.name,
                                                            {
                                                                required: `*${field.name} is required`,
                                                            }
                                                        )}
                                                        fill="outline"
                                                        label={field.label}
                                                        className="ion-margin-top"
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}

                                        {photo ? (
                                            <IonImg
                                                className="ion-margin-top"
                                                style={{
                                                    height: '200px',
                                                    backgroundImage: 'cover',
                                                }}
                                                src={photo}
                                                alt="UPLOADED_PHOTO"
                                            ></IonImg>
                                        ) : (
                                            <>
                                                <IonButton
                                                    color="medium"
                                                    size="default"
                                                    expand="block"
                                                    onClick={uploadPhoto}
                                                    className="ion-margin-top"
                                                >
                                                    Limit 4Mb
                                                    <IonIcon
                                                        icon={imagesOutline}
                                                        slot="end"
                                                    />
                                                </IonButton>
                                                {error && (
                                                    <p
                                                        style={{
                                                            color: 'red',
                                                            marginTop: '5px',
                                                        }}
                                                    >
                                                        {error}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                        <IonButton
                                            expand="block"
                                            size="large"
                                            type="submit"
                                            className="ion-margin-top"
                                        >
                                            Upload
                                            <IonIcon
                                                icon={downloadOutline}
                                                slot="end"
                                            ></IonIcon>
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
                    position="top"
                    duration={2000}
                    positionAnchor="headerAddProduct"
                    onDidDismiss={() => {
                        setToast({
                            isOpen: false,
                        })
                    }}
                ></IonToast>
            </IonContent>
        </>
    )
}

export default AddProduct
