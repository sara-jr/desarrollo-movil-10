import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import { add, search } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const routes: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rutas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar placeholder="Buscar ruta..."></IonSearchbar>
        <IonButton expand="block" onClick={() => history.push('/add-route')}>
          <IonIcon slot="start" icon={add} />
          Crear Nueva Ruta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default routes;
