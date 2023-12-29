import Image from 'next/image'

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonMenuButton,
    IonList,
    IonInput,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { TextFieldTypes } from '../../interfaces/interfaces'

const Auth = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const formFields = [
        {
            type: '',
            name: 'email',
            placeholder: 'Email',
        },

        {
            name: 'password',
            placeholder: 'password',
        },
    ]

    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="text-center">Authorization</IonTitle>
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
                                        type={field.name as TextFieldTypes}
                                        placeholder={field.placeholder}
                                        minlength={4}
                                    />
                                </div>
                            )
                        })}

                        <IonButton
                            id="open-toast"
                            expand="full"
                            size="large"
                            type="submit"
                        >
                            Authorize
                        </IonButton>
                    </form>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Auth
