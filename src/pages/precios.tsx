import React from 'react';
import { IonHeader, IonPage, IonTitle, IonContent } from '@ionic/react';

const Precios: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Precios</IonTitle>
      </IonHeader>
      <IonContent>
        <h1>Precios</h1>
        <p>El precio del autobús es de $10 pesos.</p>
        {/* Aquí puedes añadir más información o un mapa si es necesario */}
      </IonContent>
    </IonPage>
  );
};

export default Precios;

