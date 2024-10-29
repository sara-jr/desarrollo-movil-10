import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';

const addRoute: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Nueva Ruta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre de la Ruta</IonLabel>
          <IonInput placeholder="Ingresa el nombre de la ruta"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Horario</IonLabel>
          <IonInput placeholder="Ingresa el horario"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Precio</IonLabel>
          <IonInput placeholder="Ingresa el precio"></IonInput>
        </IonItem>
        <IonButton expand="block">Guardar Ruta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default addRoute;
