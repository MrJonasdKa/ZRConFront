import React, { useState, useEffect } from 'react';
import { IonModal, IonButton, IonContent, IonInput, IonItem, IonLabel, IonDatetime } from '@ionic/react';
import { updateActivoFijo, ActivoFijo } from '../../services/activosFijosService';

interface EditActivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activo: ActivoFijo | null;
  onSave: () => void;
}

const EditActivoModal: React.FC<EditActivoModalProps> = ({ isOpen, onClose, activo, onSave }) => {
  const [formData, setFormData] = useState<ActivoFijo | null>(null);

  useEffect(() => {
    if (activo) {
      const updatedActivo = {
        ...activo,
        fecha_ingreso: activo.fecha_ingreso instanceof Date 
          ? activo.fecha_ingreso
          : new Date(activo.fecha_ingreso)
      };
      setFormData(updatedActivo);
    }
  }, [activo]);

  const handleChange = (e: CustomEvent, key: keyof ActivoFijo) => {
    if (formData) {
      const value = e.detail.value!;
      setFormData({
        ...formData,
        [key]: key === 'fecha_ingreso' ? value.split('T')[0] : value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && formData.id) {
      try {
        await updateActivoFijo(formData.id, formData);
        onSave();
        onClose();
      } catch (error) {
        console.error('Error updating activo:', error);
      }
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <h1>Editar Activo</h1>
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
                  name={key}
                  value={formData[key as keyof ActivoFijo] as string | number | null | undefined}
                  onIonChange={(e) => handleChange(e, key as keyof ActivoFijo)}
                  required
                />
              )}
            </IonItem>
          ))}
          <IonButton expand="block" type="submit">Guardar Cambios</IonButton>
          <IonButton expand="block" onClick={onClose} color="medium">Cancelar</IonButton>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default EditActivoModal;