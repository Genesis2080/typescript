import { RespuestaAPI } from '../domain/types/respuesta-api';

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://api.universidad.es') {
    this.baseUrl = baseUrl;
  }

  async obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const datosSimulados = this.simularDatos<T>(endpoint);
        
        resolve({
          codigoEstado: 200,
          exito: true,
          datos: datosSimulados
        });
      }, 100);
    });
  }

  private simularDatos<T>(endpoint: string): T {
    if (endpoint.includes('estudiantes')) {
      return {
        id: 'EST-001',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@university.es',
        fechaNacimiento: new Date()
      } as T;
    }
    if (endpoint.includes('asignaturas')) {
      return {
        codigo: 'MAT101',
        nombre: 'Matemáticas',
        creditos: 6,
        curso: 1
      } as T;
    }
    return {} as T;
  }
}

export const apiClient = new APIClient();
