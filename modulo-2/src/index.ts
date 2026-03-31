import { apiClient } from './services/api-client';
import { Estudiante } from './domain/types/estudiante';
import { Asignatura } from './domain/types/asignatura';
import { RespuestaAPI } from './domain/types/respuesta-api';

async function main() {
  console.log('--- Obteniendo Estudiante ---');
  const respuestaEstudiante = await apiClient.obtenerRecurso<Estudiante>('/estudiantes/EST-001');
  console.log('Código:', respuestaEstudiante.codigoEstado);
  console.log('Éxito:', respuestaEstudiante.exito);
  console.log('Datos:', respuestaEstudiante.datos);

  console.log('\n--- Obteniendo Asignatura ---');
  const respuestaAsignatura = await apiClient.obtenerRecurso<Asignatura>('/asignaturas/MAT101');
  console.log('Código:', respuestaAsignatura.codigoEstado);
  console.log('Éxito:', respuestaAsignatura.exito);
  console.log('Datos:', respuestaAsignatura.datos);
}

main();
