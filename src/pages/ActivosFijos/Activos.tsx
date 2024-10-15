import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { add, create, trash } from 'ionicons/icons';
import NavBar from '../../components/NavBar/NavBar';
import { getAllActivosFijos, deleteActivoFijo, ActivoFijo } from '../../services/activosFijosService';
import EditActivoModal from '../../components/EditActivoModal/EditActivoModal';

const Activos: React.FC = () => {
  const [activos, setActivos] = useState<ActivoFijo[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedActivo, setSelectedActivo] = useState<ActivoFijo | null>(null);

  useEffect(() => {
    loadActivos();
  }, []);

  const loadActivos = async () => {
    try {
      const data = await getAllActivosFijos();
      setActivos(data);
    } catch (error) {
      console.error('Error loading activos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este activo?')) {
      try {
        await deleteActivoFijo(id);
        loadActivos();
      } catch (error) {
        console.error('Error deleting activo:', error);
      }
    }
  };

  const handleEdit = (activo: ActivoFijo) => {
    setSelectedActivo(activo);
    setShowEditModal(true);
  };

  return (
    <IonPage>
      <NavBar />
      <IonContent className="ion-padding">
        <h1>Activos Fijos</h1>
        <IonButton routerLink="/activos/crear" expand="block">
          <IonIcon icon={add} slot="start" />
          Agregar Activo
        </IonButton>
        <IonList>
          {activos.map((activo) => (
            <IonItem key={activo.id}>
              <IonLabel>{activo.numero} - {activo.ubicacion_general}</IonLabel>
              <IonButton onClick={() => handleEdit(activo)} fill="clear">
                <IonIcon icon={create} slot="icon-only" />
              </IonButton>
              <IonButton onClick={() => activo.id && handleDelete(activo.id)} fill="clear" color="danger">
                <IonIcon icon={trash} slot="icon-only" />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <EditActivoModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          activo={selectedActivo}
          onSave={loadActivos}
        />
      </IonContent>
    </IonPage>
  );
};

export default Activos;