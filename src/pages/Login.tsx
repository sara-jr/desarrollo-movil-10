import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert,
  useIonLoading,
  useIonRouter, } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { notificationsOutline, searchOutline, locationOutline, addOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/auth'
import {AuthContext} from '../providers/AuthProvider'
import { useContext, useEffect } from "react";

const Login: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm()
  const { authUser, loadUser } = useContext(AuthContext);
	const navigation = useIonRouter();

	useEffect(() => {
		if (authUser) {
			navigation.push('/', 'root');
		}
	}, [authUser]);
  const [present, dismiss] = useIonLoading()
  const [showAlert] = useIonAlert()

  const { sendMagicLink, createAccount, logIn } = useAuth();

  const triggerMagicLink = async () => {
    present()
    const data = getValues()
    await sendMagicLink(data.email)
    dismiss()
    showAlert('Check your emails for the magic link!')
  }

  const signUp = async () => {
    await present()
    const data = getValues()
    try {
      await createAccount!(data.email, data.password)
      dismiss()
      showAlert('Please check your inbox to confirm your account!')
    } catch (e) {
      dismiss()
      showAlert('Login failed, invalid credentials')
    }
  }

  const signIn = async (data: any) => {
    await present()
    try {
      console.log('try login...')

      await logIn!(data.email, data.password)
      dismiss()
      await loadUser!()
    } catch (e) {
      dismiss()
      showAlert('Login failed, invalid credentials')
    }
  }

  return (
    <IonPage>
      <IonContent>
        <IonCard className='fondo'>
          <IonTitle>Iniciar sesión</IonTitle>
          <IonCardContent>
            <form onSubmit={handleSubmit(signIn)}>
              <IonInput required fill='outline' label='Correo electronico' labelPlacement='stacked' type='email' {...register('email', {required: true})}></IonInput>
              <br />
              <IonInput required fill='outline' label='Contraseña' labelPlacement='stacked' type='password' {...register('password', {required: true})}>
                <IonInputPasswordToggle slot='end'></IonInputPasswordToggle>
              </IonInput>
              <br />
              <IonButton className='buton' expand='full' type='submit'>
                Iniciar sesión
              </IonButton>
              <br/>              
              <IonButton expand="full" type="button" color="secondary">
		Crear una cuenta
	      </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
