import { apiClient } from './services/api-client';
import { Estudiante } from './domain/types/estudiante';
import { Asignatura } from './domain/types/asignatura';
import { MatriculaActiva, MatriculaSuspendida, MatriculaFinalizada } from './domain/types/matricula';
import { generarReporte } from './domain/types/reporte';

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

  console.log('\n--- Reportes de Matrícula ---');
  const activa: MatriculaActiva = { tipo: "ACTIVA", asignaturas: [{ codigo: "MAT101", nombre: "Matemáticas", creditos: 6, curso: 1 }] };
  const suspendida: MatriculaSuspendida = { tipo: "SUSPENDIDA", motivo: "Falta de pago" };
  const finalizada: MatriculaFinalizada = { tipo: "FINALIZADA", notaMedia: 8.5 };

  console.log(generarReporte(activa));
  console.log(generarReporte(suspendida));
  console.log(generarReporte(finalizada));
}

main();
