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
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { Camera, CameraResultType } from '@capacitor/camera'

import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import { documentOutline, downloadOutline, imagesOutline } from 'ionicons/icons'

const Product = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [photo, setPhoto] = useState('')

    const uploadPhoto = async () => {
        try {
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
            data.image = photo

            const res = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                body: JSON.stringify(data),
            })
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
            placeholder: 'Tasty coffe',
        },
        {
            label: 'Price',
            name: 'price',
            placeholder: '20$',
            isNum: true,
        },
    ]

    return (
        <>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">
                        Create Poroduct
                    </IonTitle>
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
                                                                }}
                                                            >
                                                                {message}
                                                            </p>
                                                        )}
                                                    />
                                                    <IonInput
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
                                                style={{
                                                    height: '200px',
                                                    backgroundImage: 'cover',
                                                }}
                                                src={photo}
                                                alt="UPLOADED_PHOTO"
                                            ></IonImg>
                                        ) : (
                                            <IonButton
                                                color="medium"
                                                size="default"
                                                expand="block"
                                                onClick={uploadPhoto}
                                                className="ion-margin-top"
                                            >
                                                <IonIcon
                                                    icon={imagesOutline}
                                                    slot="start"
                                                />
                                            </IonButton>
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
            </IonContent>
        </>
    )
}

export default Product
