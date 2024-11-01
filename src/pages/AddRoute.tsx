import { IonContent, IonRange, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';

const AddRoute: React.FC = () => {
  const [pointsInputs, setPointsInputs] = useState([{name:'point1'}]);
  const count = pointsInputs.length
  const addPointInput = ()=>{
    setPointsInputs([...pointsInputs, {name:`point${count}`}])
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Nueva Ruta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre de la Ruta</IonLabel>
          <IonInput placeholder="Ingresa el nombre de la ruta" type="text" minlength={3}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Horario</IonLabel>
          <IonRange aria-label="Range with ticks" pin={true} pinFormatter={(value)=>`${value} H`} ticks={true} dualKnobs={true} snaps={true} min={0} max={23}></IonRange>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Precio</IonLabel>
          <IonInput placeholder="Ingresa el precio" type="number" min={0}></IonInput>
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
                  <IonInput name={`longitude_${index}`} type='number' min={-90} max={90} placeholder={`Longitud ${human_index}`}></IonInput>
                </IonCol>
                <IonCol size='5'>
                  <IonInput name={`latitude_${index}`} type='number' min={-90} max={90} placeholder={`Latitud ${human_index}`}></IonInput>
                </IonCol>
              </IonRow>
            );
          })
        }
        </IonGrid>
        <IonButton onClick={addPointInput} ><IonIcon icon={addOutline} slot='start'></IonIcon>Agregar punto</IonButton>
        <IonButton expand="block">Guardar Ruta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddRoute;
