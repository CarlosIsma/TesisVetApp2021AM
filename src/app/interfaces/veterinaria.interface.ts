export interface veterinariaI {
  id?: string;
  nombre: string;
  direccion: string;
  horario: string;
  referencia: string;
  telefono: number;
  imagen: string;
  formasPago: string;
  servicios: string;
  coordenadas: any;
  pdfRUC: string;
  sector: string;
  formaPago: string;
  horaApertura: string;
  horaCierre: string;
  position?: any;
  aprobado: boolean;
  idPropietario?: string;
  cedulaPropietario?: string;
  mensajeAprobacionChecked?: boolean;
  mensajeAprobacion?: string;
}

export interface ubicacionVeterinariasI {
  id?: string;
  nombre: string;
  imagen: string;
  position: any;
  markerObj?: any;
}
