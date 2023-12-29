import {
    IonActionSheet,
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonList,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { Camera, CameraResultType } from '@capacitor/camera'

import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

const Prouduct = () => {
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
            name: 'name',
            placeholder: 'Name',
        },

        {
            name: 'description',
            placeholder: 'Description',
        },
        {
            name: 'price',
            placeholder: 'Price',
        },
    ]

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle style={{ textAlign: 'center' }}>
                        Create Poroduct
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields.map((field, index) => {
                            return (
                                <div key={index}>
                                    <ErrorMessage
                                        errors={errors}
                                        name={field.name}
                                        render={({ message }) => (
                                            <p style={{ color: 'red' }}>
                                                {message}
                                            </p>
                                        )}
                                    />
                                    <IonInput
                                        {...register(field.name, {
                                            required: `*${field.name} is required`,
                                        })}
                                        placeholder={field.placeholder}
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
                                id="open-action-sheet"
                                size="small"
                                expand="full"
                                onClick={uploadPhoto}
                            >
                                Upload photo
                            </IonButton>
                        )}
                        <IonButton
                            id="open-toast"
                            expand="full"
                            size="large"
                            type="submit"
                        >
                            Add Product
                        </IonButton>
                    </form>

                    <IonToast
                        style={{ color: 'green' }}
                        trigger="open-toast"
                        message="Product successfully added"
                        duration={5000}
                    ></IonToast>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Prouduct
