import { IonBadge, IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { notificationsOutline, searchOutline, locationOutline, addOutline, logOutOutline, logOut, warningOutline } from 'ionicons/icons';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { useAuth } from '../hooks/auth';
import { useIonAlert, useIonLoading } from '@ionic/react';

const Home: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const isAdmin = authUser.labels.includes('admin');
  const { signOutUser } = useAuth();
  const [present, dismiss] = useIonLoading()
  const navigator = useIonRouter()
  const [showAlert] = useIonAlert()
  const handleLogout = ()=>{
    showAlert('Confirme cerrar la sesión', [
      {
        text: 'Confirmar', 
        handler: async (d)=>{
          await signOutUser()
          navigator.push('/login', 'back')
        }
      },
      {text: 'Cancelar'}
    ])
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton id='search-btn' size='large'>
              <IonIcon slot='icon-only' icon={searchOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle style={{textAlign: 'center'}} color={isAdmin?'warning':'primary'}>Inicio </IonTitle>
          <IonButtons slot='end'>
            <IonButton id='notifications-btn' fill='solid'>
              <IonBadge id='notification-count'>1</IonBadge>
              <IonIcon slot='end' icon={notificationsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        { isAdmin && <IonToast color='warning' message='Está en modo administrador' duration={3000} isOpen={true} position='top'></IonToast>}
        <IonGrid>
          <IonRow>
            <IonCol size='12' class='ion-align-items-center ion-justify-content-center'>
              <IonButton expand='block' routerLink='/closestroute'>
                <IonIcon icon={locationOutline} slot='start'>
                </IonIcon>
                Buscar rutas cercanas a mí
              </IonButton>
            </IonCol>
          </IonRow>
          {
            isAdmin &&
            <IonRow>
              <IonCol size='12' class='ion-align-items-center ion-justify-content-center'>
                <IonButton color='warning' expand='block'>
                  <IonIcon icon={addOutline} slot='start'>
                  </IonIcon>
                  Crear ruta
                </IonButton>
              </IonCol>
            </IonRow> 
          }
          <IonRow>
            <IonCol size='12' class='ion-align-items-center ion-justify-content-center'>
              <IonButton color='tertiary' expand='block' onClick={handleLogout}>
                <IonIcon icon={logOutOutline} slot='start'>
                </IonIcon>
                Cerrar sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
