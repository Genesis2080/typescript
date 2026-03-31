import { RespuestaAPI } from '../domain/types/respuesta-api';
import { Estudiante } from '../domain/types/estudiante';
import { Asignatura } from '../domain/types/asignatura';

type Entidadconocida = Estudiante | Asignatura;

export class APIClient {
  private baseUrl: string;
  private datosSimulados: Map<string, Entidadconocida>;

  constructor(baseUrl: string = 'http://api.universidad.es') {
    this.baseUrl = baseUrl;
    this.datosSimulados = new Map();
    this.inicializarDatos();
  }

  private inicializarDatos(): void {
    this.datosSimulados.set('/estudiantes/EST-001', {
      id: 'EST-001',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@universidad.es',
      fechaNacimiento: new Date(2000, 5, 15)
    });
    this.datosSimulados.set('/estudiantes/EST-002', {
      id: 'EST-002',
      nombre: 'María',
      apellido: 'García',
      email: 'maria.garcia@universidad.es',
      fechaNacimiento: new Date(2001, 3, 22)
    });
    this.datosSimulados.set('/asignaturas/MAT101', {
      codigo: 'MAT101',
      nombre: 'Matemáticas',
      creditos: 6,
      curso: 1
    });
    this.datosSimulados.set('/asignaturas/FIS101', {
      codigo: 'FIS101',
      nombre: 'Física',
      creditos: 6,
      curso: 1
    });
  }

  async obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const datos = this.datosSimulados.get(endpoint);
        
        if (datos) {
          resolve({
            codigoEstado: 200,
            exito: true,
            datos: datos as T
          });
        } else {
          resolve({
            codigoEstado: 404,
            exito: false,
            datos: null as unknown as T,
            errores: [`Recurso no encontrado: ${endpoint}`]
          });
        }
      }, 100);
    });
  }

  async listarRecursos<T>(endpoint: string): Promise<RespuestaAPI<T[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recursos: T[] = [];
        
        this.datosSimulados.forEach((valor, clave) => {
          if (clave.startsWith(endpoint)) {
            recursos.push(valor as T);
          }
        });
        
        resolve({
          codigoEstado: 200,
          exito: true,
          datos: recursos
        });
      }, 100);
    });
  }
}

export const apiClient = new APIClient();
