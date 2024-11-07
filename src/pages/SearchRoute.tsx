import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonSearchbar, IonList, IonListHeader, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import { add, search } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useRouteData } from '../hooks/routeData';
import { useEffect, useState } from 'react';


export const SearchRoutes: React.FC = () => {
  const history = useHistory();
  const [ routes, setRoutes ] = useState([] as any[])
  const { searchRoutesByName } = useRouteData()
  const handleQuery = async(query:string)=>{
    setRoutes(await searchRoutesByName(query))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
              <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Rutas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar placeholder="Escribe un nombre y presiona enter para buscar" debounce={1000} onIonChange={({detail})=>handleQuery(detail.value ?? '')} ></IonSearchbar>
        <IonList>
          <IonListHeader>Resultados de busqueda</IonListHeader>
          {
            routes.map((route)=>(
              <IonItem routerLink={`/route/${route.$id}`}> {route.name} </IonItem>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

