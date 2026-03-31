import { EstadoMatricula, MatriculaActiva, MatriculaSuspendida, MatriculaFinalizada } from './matricula';

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA": {
      const nombres = estado.asignaturas.map(a => a.nombre).join(', ');
      return `Matrícula ACTIVA. Asignaturas matriculadas: ${nombres}`;
    }
    case "SUSPENDIDA": {
      return `Matrícula SUSPENDIDA. Motivo: ${estado.motivo}`;
    }
    case "FINALIZADA": {
      return `Matrícula FINALIZADA. Nota media: ${estado.notaMedia}`;
    }
    default: {
      const _exhaustivo: never = estado;
      return _exhaustivo;
    }
  }
}
