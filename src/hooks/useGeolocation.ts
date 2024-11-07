import { Geolocation } from '@capacitor/geolocation';

// Tipo que representa las coordenadas del dispositivo según Capacitor
export interface PositionCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const useGeolocation = () => {
  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      return {location: position.coords, error: null}
    } catch (err: any) {
      return {location: null, error: err}
    }
  };
  return { getLocation };
};

