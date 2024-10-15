import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonLoading } from '@ionic/react';
import { login } from '../../services/authService';
import NavBar from '../../components/NavBar/NavBar';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      console.log('Login successful', result);
      window.dispatchEvent(new Event('login'));
      // Redirigir al usuario a la página principal
      window.location.href = '/home';
    } catch (error) {
      console.error('Login failed', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <NavBar/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">Iniciar Sesión</IonButton>
        </form>
        <IonLoading isOpen={loading} message={'Por favor espere...'} />
      </IonContent>
    </IonPage>
  );
};

export default Login;