import axios from 'axios';

const API_URL = 'https://zrconsulback-production.up.railway.app/api/activos-fijos';
//const API_URL = 'http://localhost:5000/api/activos-fijos';

export interface ActivoFijo {
    id?: number;
    numero: string;
    ubicacion_general: string;
    ubicacion_especifica: string;
    piso: string;
    responsable: string;
    cargo: string;
    rubro_contable: string;
    tipo_bien: string;
    codigo_anterior: string;
    codigo_actual: string;
    estado_numero: string;
    fecha_ingreso: Date;
    costo_historico: number;
    partida: string;
    depreciacion_acumulada: number;
    valor_neto: number;
    incremento_decremento: number;
    valor_revaluo: number;
    anios_vida_util: number;
    clasificacion: string;
  }

export const getAllActivosFijos = async (): Promise<ActivoFijo[]> => {
  const response = await axios.get<ActivoFijo[]>(API_URL);
  return response.data;
};

export const getActivoFijoById = async (id: number): Promise<ActivoFijo> => {
  const response = await axios.get<ActivoFijo>(`${API_URL}/${id}`);
  return response.data;
};

export const createActivoFijo = async (data: ActivoFijo): Promise<ActivoFijo> => {
  const response = await axios.post<ActivoFijo>(API_URL, data);
  return response.data;
};

export const updateActivoFijo = async (id: number, data: ActivoFijo): Promise<ActivoFijo> => {
  const response = await axios.put<ActivoFijo>(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteActivoFijo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};