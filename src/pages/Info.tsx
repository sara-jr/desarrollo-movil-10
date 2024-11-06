<<<<<<< HEAD
import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonLabel, IonTab, IonItem, IonText } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const Info: React.FC = () => {
    // Nombre de la ruta
    const [routeName] = useState<string>('Ruta 10');
  
    // Información para cada pestaña
    const generalInfo = "Información general sobre la ruta. Aquí puedes ver detalles sobre el recorrido y las paradas.";
    const pricingInfo = "Precios aproximados para viajar en esta ruta. Asegúrate de verificar con el conductor.";
    const reportInfo = "Reportes sobre la ruta, incidencias, horarios y más.";
  
    // Coordenadas de ejemplo (puedes cambiarlas por las de tus rutas de autobuses)
    const initialPosition: LatLngExpression = [19.432608, -99.133209]; // Coordenadas de CDMX
    const markers = [
      { lat: 19.432608, lng: -99.133209, title: "Parada 1" },
      { lat: 19.433208, lng: -99.132209, title: "Parada 2" },
      { lat: 19.434208, lng: -99.131209, title: "Parada 3" }
    ];
  
=======
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
>>>>>>> origin/detalles
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
<<<<<<< HEAD
              <IonBackButton />
            </IonButtons>
            <IonTitle>{routeName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* Mapa con Leaflet */}
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
  
          {/* Pestañas de información */}
          <IonTabs>
            <IonTabBar slot="top">
=======
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
>>>>>>> origin/detalles
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
<<<<<<< HEAD
  
            {/* Aquí debemos usar IonTab y colocar la información de cada pestaña */}
            <IonTab tab="general">
              <IonItem>
                <IonText>{generalInfo}</IonText>
=======
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
>>>>>>> origin/detalles
              </IonItem>
            </IonTab>
            <IonTab tab="pricing">
              <IonItem>
<<<<<<< HEAD
                <IonText>{pricingInfo}</IonText>
=======
                <IonText>Precio base: {route.price}</IonText>
>>>>>>> origin/detalles
              </IonItem>
            </IonTab>
            <IonTab tab="reports">
              <IonItem>
<<<<<<< HEAD
                <IonText>{reportInfo}</IonText>
=======
                <IonText>{}</IonText>
>>>>>>> origin/detalles
              </IonItem>
            </IonTab>
          </IonTabs>
        </IonContent>
      </IonPage>
    );
  };
  
export default Info;
