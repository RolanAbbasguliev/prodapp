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
    IonCard,
    IonCardContent,
    useIonRouter,
    IonGrid,
    IonRow,
    IonCol,
    IonToast,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { TextFieldTypes } from '../../interfaces/interfaces'
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import { useState } from 'react'

const Login = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [reqSuccess, setReqSuccess] = useState(false)
    const router = useIonRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const formFields = [
        {
            name: 'email',
            placeholder: 'test@gmail.com',
            label: 'Email',
        },

        {
            name: 'password',
            placeholder: 'password',
            label: 'Password',
        },
    ]

    const onSubmit = async (data: any) => {
        try {
            setIsOpen(true)
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const message = (await res.json()).message
            setMessage(message)

            if (res.status === 200) {
                setReqSuccess(true)
                router.push('/app')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">
                        Native App v1
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
                                                        {...register(
                                                            field.name,
                                                            {
                                                                required: `* ${field.name} is required`,
                                                            }
                                                        )}
                                                        type={
                                                            field.name as TextFieldTypes
                                                        }
                                                        fill="outline"
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        label={field.label}
                                                        labelPlacement="floating"
                                                        className="ion-margin-top"
                                                    />
                                                </div>
                                            )
                                        })}

                                        <IonButton
                                            expand="block"
                                            type="submit"
                                            className="ion-margin-top"
                                        >
                                            Login
                                            <IonIcon
                                                icon={logInOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                        <IonButton
                                            routerLink="/registration"
                                            expand="block"
                                            type="button"
                                            className="ion-margin-top"
                                        >
                                            Create Account
                                            <IonIcon
                                                icon={personCircleOutline}
                                                slot="end"
                                            />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonToast
                color={reqSuccess ? 'success' : 'danger'}
                isOpen={isOpen}
                message={message}
                onDidDismiss={() => setIsOpen(false)}
                duration={2000}
            ></IonToast>
        </IonPage>
    )
}

export default Login
