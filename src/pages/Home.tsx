import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { notificationsOutline, searchOutline, locationOutline, addOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton id='search-btn' size='large'>
              <IonIcon slot='icon-only' icon={searchOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle style={{'text-align': 'center'}}>Inicio</IonTitle>
          <IonButtons slot='end'>
            <IonButton id='notifications-btn' fill='solid'>
              <IonBadge id='notification-count'>1</IonBadge>
              <IonIcon slot='end' icon={notificationsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size='12' class='ion-align-items-center ion-justify-content-center'>
              <IonButton expand='block'>
                <IonIcon icon={locationOutline} slot='start'>
                </IonIcon>
                Buscar rutas cercanas a mí
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12' class='ion-align-items-center ion-justify-content-center'>
              <IonButton color='warning' expand='block'>
                <IonIcon icon={addOutline} slot='start'>
                </IonIcon>
                Crear ruta
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
