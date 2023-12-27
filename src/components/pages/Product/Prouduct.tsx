import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import React, { ChangeEvent, EventHandler, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType } from '@capacitor/camera';

const Prouduct = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const onClick = async () => {
    await Preferences.set({
      key: 'productName',
      value: name,
    });

    console.log(await Preferences.get({ key: 'productName' }));
  };

  function blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const fetchMe = async () => {
    const res = await fetch('/api/product');
    console.log(await res.json());
  };

  const uploadPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });

      // setPhoto(imageUrl!);

      console.log(image);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: 'center' }}>Create Poroduct</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className=" ">
          <IonItem>
            <IonInput
              placeholder="Product name"
              value={name}
              onIonChange={(e: any) => setName(e.target.value)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput placeholder="Product description"></IonInput>
          </IonItem>

          <IonItem>
            <IonInput placeholder="Product price"></IonInput>
          </IonItem>
          {/* 
          {photo ? (
            <IonImg
              style={{ border: '1px solid black', minHeight: '500px' }}
              src={photo}
              alt="sosi"
            ></IonImg>
          ) : (
            <IonButton
              id="open-action-sheet"
              size="small"
              expand="full"
              // onClick={uploadPhoto}
            >
              Upload photo
            </IonButton>
          )} */}
          <IonButton
            id="open-toast"
            expand="full"
            size="large"
            onClick={fetchMe}
          >
            Add Product
          </IonButton>

          <IonActionSheet
            className="my-custom-class"
            trigger="open-action-sheet"
            buttons={[
              {
                text: 'Take Picture',
                role: 'takePicture',
                data: {
                  action: 'takePicture',
                },
              },
              {
                text: 'From Photos',
                data: {
                  action: 'fromPhotos',
                },
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ]}
            onDidDismiss={({ detail }) => {
              if (detail.data) {
                if (detail.data.action !== 'cancel') {
                  uploadPhoto();
                }
              }
            }}
          ></IonActionSheet>
          <IonToast
            style={{ color: 'green' }}
            trigger="open-toast"
            message="Product successfully added"
            duration={5000}
          ></IonToast>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Prouduct;
