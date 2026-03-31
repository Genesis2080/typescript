import { EstadoMatricula, MatriculaActiva, MatriculaSuspendida, MatriculaFinalizada } from './matricula';

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA": {
      const asignaturas = (estado as MatriculaActiva).asignaturas;
      const nombres = asignaturas.map(a => a.nombre).join(', ');
      return `Matrícula ACTIVA. Asignaturas matriculadas: ${nombres}`;
    }
    case "SUSPENDIDA": {
      const motivo = (estado as MatriculaSuspendida).motivo;
      return `Matrícula SUSPENDIDA. Motivo: ${motivo}`;
    }
    case "FINALIZADA": {
      const nota = (estado as MatriculaFinalizada).notaMedia;
      return `Matrícula FINALIZADA. Nota media: ${nota}`;
    }
  }
}
