import React from 'react';
import { IonHeader, IonPage, IonTitle, IonContent } from '@ionic/react';

const Imprevistos: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Imprevistos</IonTitle>
      </IonHeader>
      <IonContent>
        <h1>Imprevistos</h1>
        <p>Aquí puedes añadir información sobre imprevistos.</p>
        {/* Agrega más contenido relevante aquí */}
      </IonContent>
    </IonPage>
  );
};

export default Imprevistos;
