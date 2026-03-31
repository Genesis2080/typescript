import { apiClient } from './services/api-client';
import { Estudiante } from './domain/types/estudiante';
import { Asignatura } from './domain/types/asignatura';
import { MatriculaActiva, MatriculaSuspendida, MatriculaFinalizada } from './domain/types/matricula';
import { generarReporte } from './domain/types/reporte';

async function main() {
  console.log('=== Módulo 2: API Client y Generación de Reportes ===\n');

  console.log('--- Obteniendo estudiante específico ---');
  const estudiante = await apiClient.obtenerRecurso<Estudiante>('/estudiantes/EST-001');
  console.log('Código:', estudiante.codigoEstado);
  console.log('Datos:', estudiante.datos);

  console.log('\n--- Obteniendo asignatura ---');
  const asignatura = await apiClient.obtenerRecurso<Asignatura>('/asignaturas/MAT101');
  console.log('Código:', asignatura.codigoEstado);
  console.log('Datos:', asignatura.datos);

  console.log('\n--- Listando todos los estudiantes ---');
  const listaEstudiantes = await apiClient.listarRecursos<Estudiante>('/estudiantes');
  console.log('Código:', listaEstudiantes.codigoEstado);
  console.log('Cantidad:', listaEstudiantes.datos.length);
  listaEstudiantes.datos.forEach(e => console.log(`  - ${e.nombre} ${e.apellido}`));

  console.log('\n--- Obteniendo recurso inexistente ---');
  const inexistente = await apiClient.obtenerRecurso<Estudiante>('/estudiantes/NO-EXISTE');
  console.log('Código:', inexistente.codigoEstado);
  console.log('Éxito:', inexistente.exito);
  console.log('Errores:', inexistente.errores);

  console.log('\n=== Generación de Reportes ===\n');
  
  const activa: MatriculaActiva = { 
    tipo: "ACTIVA", 
    asignaturas: [
      { codigo: "MAT101", nombre: "Matemáticas", creditos: 6, curso: 1 },
      { codigo: "FIS101", nombre: "Física", creditos: 6, curso: 1 }
    ] 
  };
  const suspendida: MatriculaSuspendida = { 
    tipo: "SUSPENDIDA", 
    motivo: "Falta de pago de matrícula" 
  };
  const finalizada: MatriculaFinalizada = { 
    tipo: "FINALIZADA", 
    notaMedia: 8.75 
  };

  console.log(generarReporte(activa));
  console.log(generarReporte(suspendida));
  console.log(generarReporte(finalizada));
}

main();
