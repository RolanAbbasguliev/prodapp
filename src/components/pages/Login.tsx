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
    IonFooter,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { TextFieldTypes } from '../../interfaces/interfaces'
import { logInOutline, logoGoogle, personCircleOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import useToast from '../../hooks/useToast'
import { useSession, signIn } from 'next-auth/react'
import { Browser } from '@capacitor/browser'
import { Preferences } from '@capacitor/preferences'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

const Login = () => {
    const { toast, setToast } = useToast()
    const { data, status, update } = useSession()

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
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            setToast({
                message: res?.status === 200 ? 'Login success' : 'Login failed',
                isOpen: true,
                color: res?.status === 200 ? 'success' : 'danger',
            })

            if (res?.status === 200) router.push('/app')
        } catch (e) {
            console.log(e)
        }
    }

    const authGoogle = async (e: any) => {
        try {
            e.preventDefault()

            GoogleAuth.initialize()

            const googleAuth = await GoogleAuth.signIn()
            if (googleAuth.authentication.idToken) {
                console.log(googleAuth.email)

                const res = await signIn('credentials', {
                    email: googleAuth.email,
                    redirect: false,
                })

                if (res?.error) {
                    setToast({
                        isOpen: true,
                        message: 'Google auth failed',
                        color: 'danger',
                    })
                    return
                }

                if (res?.status === 200) {
                    setToast({
                        isOpen: true,
                        message: 'Google auth success',
                        color: 'success',
                    })
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!(status === 'authenticated')) {
            const interval = setInterval(() => {
                // console.log(status)
                update()
            }, 1000)

            return () => clearInterval(interval)
        } else {
            router.push('/app')
        }
    }, [update])

    return (
        <IonPage>
            <IonHeader id="headerLogin">
                <IonToolbar color="dark">
                    <IonTitle className="ion-text-center">
                        Scan Product App v1
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
                                                        mode="md"
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
                                    </form>
                                    <IonButton
                                        expand="block"
                                        type="button"
                                        className="ion-margin-top"
                                        onClick={(e) => authGoogle(e)}
                                    >
                                        Google Auth
                                        <IonIcon
                                            slot="end"
                                            icon={logoGoogle}
                                        ></IonIcon>
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
                    positionAnchor="headerLogin"
                    onDidDismiss={() => {
                        setToast({
                            isOpen: false,
                        })
                    }}
                ></IonToast>
            </IonContent>
        </IonPage>
    )
}

export default Login
