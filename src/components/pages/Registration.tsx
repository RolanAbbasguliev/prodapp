import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonInput,
    IonCard,
    IonCardContent,
    IonBackButton,
    useIonRouter,
    IonGrid,
    IonCol,
    IonRow,
} from '@ionic/react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { TextFieldTypes } from '../../interfaces/interfaces'
import { happyOutline } from 'ionicons/icons'

const Registration = () => {
    const router = useIonRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const formFields = [
        {
            name: 'name',
            placeholder: 'Rolan',
            label: 'Name',
        },
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
            const res = await fetch('/api/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (res.status === 200) router.push('/app')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        Create Account
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
                                                        fill="outline"
                                                        type={
                                                            field.name as TextFieldTypes
                                                        }
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
                                            routerLink="/registration"
                                            expand="block"
                                            // size="large"

                                            className="ion-margin-top"
                                            type="submit"
                                        >
                                            Create Account
                                            <IonIcon
                                                icon={happyOutline}
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
        </IonPage>
    )
}

export default Registration
