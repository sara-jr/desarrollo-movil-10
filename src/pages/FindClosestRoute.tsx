// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, useIonLoading, useIonAlert } from '@ionic/react';
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
      <IonContent>
        <div style={{ padding: '16px' }}>
          <h2>Bienvenido a la aplicación de transporte público</h2>
          <IonButton expand="full" onClick={handleLocationRequest} disabled={currentLocation === null}>
            Obtener ubicación y rutas cercanas
          </IonButton>

          {/* Si la ubicación fue encontrada, mostramos la ruta más cercana */}
          {closestRoute ? (
            <div>
              <h3>Ruta más cercana:</h3>
              <p><strong>{closestRoute.name}</strong></p>
              <p>Distancia: {haversineDistance(currentLocation.latitude, currentLocation.longitude, closestRoute.latitudes[0], closestRoute.longitudes[0]).toFixed(2)} km</p>
            </div>
          ) : (
            <p>Aún no hemos encontrado una ruta cercana</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FindClosestRoute;
