// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonTitle, IonPage, IonButton, useIonLoading, useIonAlert, IonList, IonItem, IonToolbar, IonButtons, IonBackButton, IonLabel, IonHeader, IonCard, IonCardContent } from '@ionic/react';
import { useRouteData } from '../hooks/routeData';
import { useGeolocation } from '../hooks/useGeolocation';
import { haversineDistance } from '../utils/haversine';

const FindClosestRoute: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState(null as any)
  const { getLocation } = useGeolocation()
  const { getRoutes } = useRouteData()
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentAlert, dismissAler] = useIonAlert();
  const [closestRoute, setClosestRoute] = useState<any>(null); // Guardaremos la ruta más cercana
  const [routes, setRoutes] = useState<any[]>([]); // Almacenamos las rutas obtenidas desde Appwrite

  // Función para obtener las rutas desde Appwrite
  const fetchRoutes = async () => {
    try {
      const response = await getRoutes();
      setRoutes(response);
    } catch (error) {
      console.error('Error al obtener las rutas:', error);
    }
  };

  // Función para encontrar la ruta más cercana
  const findClosestRoute = (location: { latitude: number; longitude: number }) => {
    let closestRoute = null;
    let minDistance = Infinity;

    routes.forEach(route => {
      for(let i = 0; i < route.longitudes.length; i++) {
        const distance = haversineDistance(location.latitude, location.longitude, route.longitudes[i], route.latitudes[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestRoute = route;
        }
      }
    });

    return closestRoute;
  };

  // Función para manejar el acceso a la ubicación
  const handleLocationRequest = () => {
    const closest = findClosestRoute(currentLocation);
    setClosestRoute(closest);  // Establecemos la ruta más cercana
  };
  const fetchLocation = async ()=>{
    const {location, error} = await getLocation()
    if(location){
      setCurrentLocation(location)
      fetchRoutes(); // Traemos las rutas al cargar la página
    }
    else{
      presentAlert(`Error ${error}`)
    }
  }

  useEffect(() => {
    fetchLocation().then(fetchRoutes)
  }, []);

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Buscar la ruta más cercana</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonButton expand="block" onClick={handleLocationRequest} disabled={currentLocation === null}>
              Buscar rutas cercanas
            </IonButton>

            {/* Si la ubicación fue encontrada, mostramos la ruta más cercana */}
            {closestRoute ? (
              <IonList>
                <IonItem>
                  <IonLabel>Ruta más cercana:</IonLabel>
                </IonItem>
                <IonItem routerLink={`/route/${closestRoute.$id}`}>
                  <IonLabel>{closestRoute.name}</IonLabel>
                </IonItem>
                <IonItem>
                  <p>Distancia: {haversineDistance(currentLocation.latitude, currentLocation.longitude, closestRoute.latitudes[0], closestRoute.longitudes[0]).toFixed(2)} km</p>
                </IonItem>
              </IonList>
            ) : (
              <IonLabel>Presiona el boton para encontrar la ruta</IonLabel>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default FindClosestRoute;
