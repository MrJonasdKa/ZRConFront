import React, { useState, useEffect } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { add, bookOutline, homeOutline, informationCircleOutline, logIn, logOut } from 'ionicons/icons';
import { isAuthenticated, logout } from '../../services/authService';
import { useHistory } from 'react-router-dom';

const SideMenu: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const history = useHistory();

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
  
    window.addEventListener('storage', checkAuth);
    window.addEventListener('login', checkAuth);
    window.addEventListener('logout', checkAuth);
  
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('login', checkAuth);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setAuthenticated(false);
      history.push('/home');
    } catch (error) {
      console.error('Logout failed:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/home">
            <IonIcon icon={homeOutline} slot="start" />
            <IonLabel>Inicio</IonLabel>
          </IonItem>
          <IonItem routerLink="/about">
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>Acerca de</IonLabel>
          </IonItem>
          {authenticated && (
            <IonItem routerLink="/activos">
              <IonIcon icon={bookOutline} slot="start" />
              <IonLabel>Activos Fijos</IonLabel>
            </IonItem>
          )}
          {authenticated ? (
            <IonItem onClick={handleLogout}>
              <IonIcon icon={logOut} slot="start" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          ) : (
            <>
              <IonItem routerLink="/login">
                <IonIcon icon={logIn} slot="start" />
                <IonLabel>Iniciar sesión</IonLabel>
              </IonItem>
            </>
          )}
          {authenticated && (
            <IonItem routerLink="/register">
              <IonIcon icon={add} slot="start" />
              <IonLabel>Registrarse</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;