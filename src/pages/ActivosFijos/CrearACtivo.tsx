import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, IonDatetime } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { createActivoFijo, ActivoFijo } from '../../services/activosFijosService';
import { useHistory } from 'react-router-dom';

const CrearActivo: React.FC = () => {
  const [formData, setFormData] = useState<ActivoFijo>({
    numero: '',
    ubicacion_general: '',
    ubicacion_especifica: '',
    piso: '',
    responsable: '',
    cargo: '',
    rubro_contable: '',
    tipo_bien: '',
    codigo_anterior: '',
    codigo_actual: '',
    estado_numero: '',
    fecha_ingreso: new Date(),
    costo_historico: 0,
    partida: '',
    depreciacion_acumulada: 0,
    valor_neto: 0,
    incremento_decremento: 0,
    valor_revaluo: 0,
    anios_vida_util: 0,
    clasificacion: ''
  });

  const history = useHistory();

  const handleChange = (e: CustomEvent, key: keyof ActivoFijo) => {
    const value = e.detail.value!;
    setFormData(prevData => ({
      ...prevData,
      [key]: key === 'fecha_ingreso' ? new Date(value) :
             ['costo_historico', 'depreciacion_acumulada', 'valor_neto', 'incremento_decremento', 'valor_revaluo', 'anios_vida_util'].includes(key) ? Number(value) :
             value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createActivoFijo(formData);
      history.push('/activos');
    } catch (error) {
      console.error('Error creating activo:', error);
    }
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent className="ion-padding">
        <h1>Crear Nuevo Activo</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <IonItem key={key}>
              <IonLabel position="floating">{key.replace('_', ' ')}</IonLabel>
              {key === 'fecha_ingreso' ? (
                <IonDatetime
                  value={formData[key as keyof ActivoFijo] as string}
                  onIonChange={(e) => handleChange(e, key as keyof ActivoFijo)}
                />
              ) : (
                <IonInput
                  type={['costo_historico', 'depreciacion_acumulada', 'valor_neto', 'incremento_decremento', 'valor_revaluo', 'anios_vida_util'].includes(key) ? 'number' : 'text'}
                  value={formData[key as keyof ActivoFijo] as string | number | null | undefined}
                  onIonChange={(e) => handleChange(e, key as keyof ActivoFijo)}
                  required
                />
              )}
            </IonItem>
          ))}
          <IonButton expand="block" type="submit">Crear Activo</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CrearActivo;