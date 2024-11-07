import { IonContent, IonRange, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonDatetime } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useRouteData} from '../hooks/routeData';
import { useForm } from 'react-hook-form';
import { useIonLoading, useIonAlert } from '@ionic/react';

const AddRoute: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [presentAlert, dismissAlert] = useIonAlert()
  const [pointsInputs, setPointsInputs] = useState([{name:'point1'}]);
  const {handleSubmit, register, getValues, setValue} = useForm();
  const count = pointsInputs.length
  const extractDateFromEvent = (ev:any)=>ev.detail.value?.split('T')[1] ?? '';
  const addPointInput = ()=>{
    setPointsInputs([...pointsInputs, {name:`point${count}`}])
  }
  const {createRoute} = useRouteData();
  const submitNewRoute = async ()=>{
    const data = getValues()
    await present()
    await createRoute(data.name, data.starts_at, data.ends_at, data.price, data.longitudes, data.latitudes);
    dismiss()
  }
  const displayError = (error: any)=>{
    presentAlert(`Error: ${error}`)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Nueva Ruta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(submitNewRoute, displayError)}>
          <IonItem>
            <IonLabel position="stacked">Nombre de la Ruta</IonLabel>
            <IonInput id='name' {...register('name', {required:true, maxLength: 126})} placeholder="Ingresa el nombre de la ruta" type="text" minlength={3}></IonInput>
          </IonItem>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                    <IonLabel>Inicio</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel>Fin</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonDatetime id='startsAt' presentation='time' name='starts_at' onIonChange={(ev)=>setValue('starts_at', extractDateFromEvent(ev))}></IonDatetime>
                </IonCol>
                <IonCol>
                  <IonDatetime id='endsAt' presentation='time' name='ends_at' onIonChange={(ev)=>setValue('ends_at', extractDateFromEvent(ev))}></IonDatetime>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio</IonLabel>
            <IonInput id='price' placeholder="Ingresa el precio" type="number" step='any' {... register('price', {required:true, min:0})}></IonInput>
          </IonItem>
          <IonItem>Puntos en la ruta: {count}</IonItem>
          <IonGrid>
          {
            pointsInputs.map((element, index) => {
              const human_index = index + 1;
              return (
                <IonRow class='ion-align-items-center ion-justify-content-center'>
                  <IonCol size='2'>
                    {human_index}
                  </IonCol>
                  <IonCol size='5'>
                    <IonInput id={`longitude${index}`} {...register(`longitudes.${index}`, {required:true})} type='number' step='any' min={-180} max={180} placeholder={`Longitud ${human_index}`}></IonInput>
                  </IonCol>
                  <IonCol size='5'>
                    <IonInput id={`latitudes${index}`}  {...register(`latitudes.${index}`, {required:true})} type='number' step='any' min={-90} max={90} placeholder={`Latitud ${human_index}`}></IonInput>
                  </IonCol>
                </IonRow>
              );
            })
          }
            <IonRow class='ion-justify-content-center'>
              <IonCol size='8'>
                <IonButton id='addPoint' type='button' onClick={addPointInput} expand='block' color='secondary'>
                  <IonIcon icon={addOutline} slot='start'></IonIcon>Agregar punto
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonButton id='submit' type='submit' expand="block">Guardar Ruta</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddRoute;
