import { useIonAlert } from '@ionic/react';
import { Permission, Query, Role } from 'appwrite';
import { useContext } from 'react';
import { database } from '../config/appwrite';
import { AuthContext } from '../providers/AuthProvider';

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const ROUTES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_ROUTES_COLLECTION_ID;


export interface Route{
  name: string,
  price: number,
  points: RoutePoint[],
  starts_at: string,
  ends_at: string,
}


export interface RoutePoint{
  longitude: number,
  latitude: number
}


export const useRouteData = ()=>{
  const [showAlert] = useIonAlert();
  const getRoutes = async (): Promise<any[]> =>{
    try{
      return (await database.listDocuments(DB_ID, ROUTES_COLLECTION_ID)).documents
    }
    catch(e){
      showAlert(`Error fetching the routes: ${e}` )
      return []
    }
  }
  const searchRoutesByName = async (name: string): Promise<any[]> =>{
    try{
      return (await database.listDocuments(DB_ID, ROUTES_COLLECTION_ID, [Query.contains('name', name)])).documents
    }
    catch(e){
      showAlert(`No results`)
      return []
    }
  }
  const getRouteById = async (id: string): Promise<any|null> =>{
    try{
      return database.getDocument(DB_ID, ROUTES_COLLECTION_ID, id)
    }
    catch(e){
      showAlert(`Error fetching the route with id ${id}: ${e}`)
      return null;
    }
  }
  const createRoute = async (name: string, starts_at: string, ends_at: string, price: number, longitudes: number[], latitudes: number[]) =>{
    try{
      return (await database.createDocument(DB_ID, ROUTES_COLLECTION_ID, 'unique()',
        {name, starts_at, ends_at, price:Number(price), longitudes, latitudes},
        [Permission.read(Role.users()), Permission.delete(Role.label('admin')), Permission.update(Role.label('admin'))])
      )
    }
    catch(e){
      showAlert(`Error creating the route: ${e}`)
      return null;
    }
  }
  const updateRouteById = async (id: string, route: Route): Promise<any|null> =>{
    try{
      return database.updateDocument(DB_ID, ROUTES_COLLECTION_ID, id, route)
    }
    catch(e){
      showAlert(`Error updating the route with id ${id}: ${e}`)
      return null;
    }
  }
  const deleteRouteById = async (id: string): Promise<any|null> =>{
    try{
      await database.deleteDocument(DB_ID, ROUTES_COLLECTION_ID, id)
    }
    catch(e){
      showAlert(`Error updating the route with id ${id}: ${e}`)
    }
  }
  return {
    getRoutes,
    getRouteById,
    createRoute,
    updateRouteById,
    deleteRouteById,
    searchRoutesByName
  }
}


