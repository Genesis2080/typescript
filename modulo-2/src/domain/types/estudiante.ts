export interface Estudiante {
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly fechaNacimiento: Date;
}

export interface Asignatura {
  readonly codigo: string;
  readonly nombre: string;
  readonly creditos: number;
  readonly curso: number;
}
