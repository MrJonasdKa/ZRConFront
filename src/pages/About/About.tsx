import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';

const About: React.FC = () => {
  return (
    <IonPage>
      <NavBar/>
      <IonContent className="ion-padding">
        <h1>Acerca de nosotros</h1>
        <p>Esta es la página de información sobre nuestra aplicación y empresa.</p>
      </IonContent>
    </IonPage>
  );
};

export default About;