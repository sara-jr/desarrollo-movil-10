import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonLabel, IonTab, IonItem, IonText, IonSpinner, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
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
    const initialPosition: LatLngExpression = [route.latitudes[0], route.longitudes[0]]; 
    const markers = route.latitudes.map((value: any, index: number)=>({lat:value, lng:route.longitudes[index], title:`Parada ${index}`}))
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Ruta: {route.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonTabBar slot='bottom'>
              <IonTabButton tab="map">
                <IonLabel>Mapa</IonLabel>
              </IonTabButton>
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
            <IonTab tab='map'>
              <MapContainer center={initialPosition} zoom={60} style={{ width: '100%', height: '100%', marginBottom: '20px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
                {markers.map((marker: any, index: number) => (
                  <Marker key={index} position={[marker.lat, marker.lng]}>
                    <Popup>{marker.title}</Popup>
                  </Marker>
                ))}
                <Polygon positions={markers} pathOptions={{color:'orange'}}></Polygon>
              </MapContainer>
            </IonTab>
            <IonTab tab="general">
              <IonItem>
                <IonText>{}</IonText>
              </IonItem>
            </IonTab>
            <IonTab tab="pricing">
              <IonItem>
                <IonText>Precio base: {route.price}</IonText>
              </IonItem>
            </IonTab>
            <IonTab tab="reports">
              <IonItem>
                <IonText>{}</IonText>
              </IonItem>
            </IonTab>
          </IonTabs>
        </IonContent>
      </IonPage>
    );
  };
  
export default Info;
