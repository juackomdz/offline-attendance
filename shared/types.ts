export interface Asistencia {
  rut: string;
  nombre: string;
  hora_entrada?: Date;
  hora_salida?: Date;
}

export interface CheckinInput {
  rut: string;
  nombre: string;
}

export const asistencias: Asistencia[] = [];
