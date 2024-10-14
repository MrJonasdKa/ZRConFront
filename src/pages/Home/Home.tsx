import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <NavBar/>
      <IonContent className="ion-padding">
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la página principal de nuestra aplicación.</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;