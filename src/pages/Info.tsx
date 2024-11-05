import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonLabel, IonTab, IonItem, IonText, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useRouteData } from '../hooks/routeData';
import { useIonAlert, useIonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import 'leaflet/dist/leaflet.css';
  
const Info: React.FC = () => {
    const {getRouteById} = useRouteData()
    const [route, setRoute] = useState(null as any)
    const [presentAlert] = useIonAlert();
    const {id} = useParams<{id:string}>();
  
    const fetchRouteData = async ()=>{
      try{
        const data = await getRouteById(id)
        setRoute(data)
      }
      catch(e){
        presentAlert(`Error: ${e}`)
      }
    }
    useEffect(()=>{fetchRouteData()}, [])
    if(route === null){
      return (
        <IonContent>
          <IonSpinner style={{width:'200px', height:'200px'}}></IonSpinner>
        </IonContent>
      ) 
    }
    const routeName = route.name;

    // Información para cada pestaña
    const generalInfo = "Información general sobre la ruta. Aquí puedes ver detalles sobre el recorrido y las paradas.";
    const pricingInfo = "Precios aproximados para viajar en esta ruta. Asegúrate de verificar con el conductor.";
    const reportInfo = "Reportes sobre la ruta, incidencias, horarios y más.";
  
    // Coordenadas de ejemplo (puedes cambiarlas por las de tus rutas de autobuses)
    const initialPosition: LatLngExpression = [route.latitudes[0], route.longitudes[0]]; // Coordenadas de CDMX
    let markers = [];
    for(let i = 0; i < route.latitudes.length; i++){
      markers.push({lat:route.latitudes[i], lng:route.longitudes[i], title:`Parada ${i}`})
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{routeName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <MapContainer
                  center={initialPosition}
                  zoom={12}
                  style={{ width: '100%', height: '300px', marginBottom: '20px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                  />
                  {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                      <Popup>{marker.title}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </IonCol>
            </IonRow>
    

            {/* Pestañas de información */}
            <IonRow>
              <IonCol>
                  <IonTabs>
                    <IonTabBar slot="top">
                      <IonTabButton tab="general">
                        <IonLabel>General</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="pricing">
                        <IonLabel>Precios</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="reports">
                        <IonLabel>Reportes</IonLabel>
                      </IonTabButton>
                    </IonTabBar>
                    <IonTab tab="general">
                      <IonItem>
                        <IonText>{generalInfo}</IonText>
                      </IonItem>
                    </IonTab>
                    <IonTab tab="pricing">
                      <IonItem>
                        <IonText>{route.price}</IonText>
                      </IonItem>
                    </IonTab>
                    <IonTab tab="reports">
                      <IonItem>
                        <IonText>{reportInfo}</IonText>
                      </IonItem>
                    </IonTab>
                  </IonTabs>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
export default Info;
