// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonLoading, IonAlert } from '@ionic/react';
import { database } from '../config/appwrite'; // Importamos la configuración de Appwrite
import useGeolocation from '../hooks/useGeolocation'; // Usamos el hook para geolocalización
import { haversineDistance } from '../utils/haversine';
// No es necesario importar GeolocationCoordinates, ya que no existe en Capacitor

const HomePage: React.FC = () => {
  const { location, error } = useGeolocation(); // Usamos el hook de geolocalización
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [closestRoute, setClosestRoute] = useState<any>(null); // Guardaremos la ruta más cercana
  const [routes, setRoutes] = useState<any[]>([]); // Almacenamos las rutas obtenidas desde Appwrite

  // Función para obtener las rutas desde Appwrite
  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await database.listDocuments('your-database-id', 'routes'); // Reemplaza con tu ID de base de datos y colección
      setRoutes(response.documents);
    } catch (error) {
      console.error('Error al obtener las rutas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para encontrar la ruta más cercana
  const findClosestRoute = (location: { latitude: number; longitude: number }) => {
    let closestRoute = null;
    let minDistance = Infinity;

    routes.forEach(route => {
      route.stops.forEach((stop: any) => {
        const distance = haversineDistance(location.latitude, location.longitude, stop.lat, stop.lon);
        if (distance < minDistance) {
          minDistance = distance;
          closestRoute = route;
        }
      });
    });

    return closestRoute;
  };

  // Función para manejar el acceso a la ubicación
  const handleLocationRequest = () => {
    setLoading(true);
    if (location) {
      const closest = findClosestRoute(location);
      setClosestRoute(closest);  // Establecemos la ruta más cercana
      setLoading(false);
    } else {
      setLoading(false);
      setShowAlert(true);  // Muestra el alerta si no se obtiene ubicación
    }
  };

  // Usamos useEffect para cargar las rutas al cargar la página
  useEffect(() => {
    fetchRoutes(); // Traemos las rutas al cargar la página
  }, []);

  return (
    <IonPage>
      <IonContent>
        {/* Cargando indicador */}
        <IonLoading isOpen={loading} message={'Obteniendo ubicación...'} />

        {/* Alerta de error */}
        {error && (
          <IonAlert
            isOpen={!!error}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message={error}
            buttons={['OK']}
          />
        )}

        {/* Contenido principal */}
        <div style={{ padding: '16px' }}>
          <h2>Bienvenido a la aplicación de transporte público</h2>

          {/* Botón para pedir acceso a la ubicación */}
          <IonButton expand="full" onClick={handleLocationRequest}>
            Obtener ubicación y rutas cercanas
          </IonButton>

          {/* Si la ubicación fue encontrada, mostramos la ruta más cercana */}
          {closestRoute ? (
            <div>
              <h3>Ruta más cercana:</h3>
              <p><strong>{closestRoute.name}</strong></p>
              <p>Distancia: {haversineDistance(location!.latitude, location!.longitude, closestRoute.stops[0].lat, closestRoute.stops[0].lon).toFixed(2)} km</p>
              <h4>Paradas:</h4>
              <ul>
                {closestRoute.stops.map((stop: any, index: number) => (
                  <li key={index}>
                    {`Parada ${index + 1}: Lat ${stop.lat}, Lon ${stop.lon}`}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Aún no hemos encontrado una ruta cercana</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
