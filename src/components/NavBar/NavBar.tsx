import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

const NavBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Mi Aplicación</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;