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

const Login = () => {
    const { toast, setToast } = useToast()
    const { data } = useSession()

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

            // const res = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })

            // const message = (await res.json()).message

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

    const authGoogle = async () => {
        try {
            // const res = await signIn('google', {})
            const { InAppBrowser } = await import(
                '@awesome-cordova-plugins/in-app-browser'
            )
            const url =
                'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=1063431845940-0glud65an0ms5kg72srf2696dteaa022.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&prompt=consent&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow'
            const ref = InAppBrowser.create(
                url,
                '_blank',
                'location=yes,hidenavigationbuttons=yes,hideurlbar=yes,toolbarcolor=#f1f5f9'
            )

            // if (ref) {
            //     ref!.on('loadstart').subscribe((e: any) => {
            //         const includesUrl = e.url.includes(`/callback/google`)
            //         if (includesUrl) {
            //             ref.close()
            //         }
            //     })
            // }

            // Browser.addListener('browserFinished', () => {
            //     console.log('finished')
            // })

            // await Browser.open({
            //     url: 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=1063431845940-0glud65an0ms5kg72srf2696dteaa022.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&prompt=consent&access_type=offline&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow',
            // })
            // await Preferences.set({
            //     key: 'googleAuth',
            //     value: 'true',
            // })
            // console.log(res, 'GOOGLE AUTH')
        } catch (e) {
            console.log(e)
        }
    }

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
                                        onClick={authGoogle}
                                    >
                                        Google Auth F
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
