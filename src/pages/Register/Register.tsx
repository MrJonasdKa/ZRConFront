import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonLoading } from '@ionic/react';
import { register } from '../../services/authService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await register(name, email, password);
      console.log('Registration successful', result);
      // Aquí puedes manejar el éxito del registro, como redirigir al usuario a la página de login
    } catch (error) {
      console.error('Registration failed', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput value={name} onIonChange={e => setName(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">Registrarse</IonButton>
        </form>
        <IonButton expand="block" fill="clear" routerLink="/login">¿Ya tienes cuenta? Inicia sesión</IonButton>
        <IonLoading isOpen={loading} message={'Por favor espere...'} />
      </IonContent>
    </IonPage>
  );
};

export default Register;