// src/hooks/useGeolocation.ts
import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

// Tipo que representa las coordenadas del dispositivo según Capacitor
interface PositionCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<PositionCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Usamos el plugin de Capacitor para obtener la posición
        const position = await Geolocation.getCurrentPosition();

        const { latitude, longitude, accuracy } = position.coords;

        // Guardamos las coordenadas en el estado
        setLocation({ latitude, longitude, accuracy });
      } catch (err: any) {
        setError(err.message);
      }
    };

    getLocation();
  }, []);

  return { location, error };
};

export default useGeolocation;
