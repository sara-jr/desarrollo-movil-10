// src/components/BusLocationComponent.tsx
import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { haversineDistance } from '../utils/haversine'; // Asegúrate de tener la función haversine para calcular la distancia

const BusLocationComponent = () => {
  const { location, error } = useGeolocation();  // Obtiene la ubicación del usuario
  const [routes, setRoutes] = useState<any[]>([]); // Rutas de autobuses (debe ser cargada desde algún servicio, API, etc.)
  const [closestRoute, setClosestRoute] = useState<any | null>(null);  // Ruta más cercana
  const [minDistance, setMinDistance] = useState<number | null>(null);  // Distancia mínima

  // Asegúrate de cargar las rutas de algún lugar (por ejemplo, desde una base de datos, API, etc.)
  useEffect(() => {
    // Esta es solo una simulación de cómo cargar rutas (reemplázalo por tu lógica de carga real)
    const fetchRoutes = async () => {
      const fetchedRoutes = [
        {
          id: 1,
          name: 'Ruta 1',
          stops: [
            { lat: 40.7128, lon: -74.0060 },
            { lat: 40.7308, lon: -73.9975 },
          ],
        },
        {
          id: 2,
          name: 'Ruta 2',
          stops: [
            { lat: 40.7580, lon: -73.9855 },
            { lat: 40.7484, lon: -73.9877 },
          ],
        },
      ];
      setRoutes(fetchedRoutes);
    };

    fetchRoutes();
  }, []);

  // Función para encontrar la ruta más cercana
  const findClosestRoute = (location: { latitude: number; longitude: number }) => {
    let closestRoute = null;
    let minDistance = Infinity;

    routes.forEach((route) => {
      route.stops.forEach((stop: { lat: number; lon: number }) => {
        const distance = haversineDistance(location.latitude, location.longitude, stop.lat, stop.lon);
        if (distance < minDistance) {
          minDistance = distance;
          closestRoute = route;
        }
      });
    });

    return { closestRoute, minDistance };
  };

  // Si la ubicación ya está disponible, busca la ruta más cercana
  useEffect(() => {
    if (location) {
      const { closestRoute, minDistance } = findClosestRoute(location);
      setClosestRoute(closestRoute);
      setMinDistance(minDistance);
    }
  }, [location, routes]);  // Se vuelve a ejecutar cuando location o routes cambian

  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Cargando ubicación...</div>;

  return (
    <div>
      <h3>Ruta más cercana:</h3>
      {closestRoute ? (
        <div>
          <p>Ruta: {closestRoute.name}</p>
          <p>Distancia: {minDistance?.toFixed(2)} km</p>
        </div>
      ) : (
        <p>No se encontró ninguna ruta cercana</p>
      )}
    </div>
  );
};

export default BusLocationComponent;
