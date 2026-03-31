# Documentación de Arquitectura - Módulo 2

## Modelo de Datos

### Entidades del Dominio

#### Estudiante (`estudiante.ts`)
```typescript
export interface Estudiante {
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly fechaNacimiento: Date;
}
```

**Decisión de diseño:** Se utiliza `interface` porque representa una entidad del dominio con propiedades jerárquicas. El uso de `readonly` garantiza la inmutabilidad tras la creación, siguiendo principios de programación funcional.

#### Asignatura (`asignatura.ts`)
```typescript
export interface Asignatura {
  readonly codigo: string;
  readonly nombre: string;
  readonly creditos: number;
  readonly curso: number;
}
```

**Decisión de diseño:** También `interface` por ser una entidad del dominio con estructura de objeto. Permite extensión futura mediante declaration merging si se necesitara añadir propiedades.

### Unión Discriminada - EstadoMatricula

```typescript
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```

**Decisión de diseño:**
- Se usa `type` para definir una **unión de tipos**, algo que no puede hacer una `interface` directamente.
- La propiedad `tipo` actúa como **discriminante** (tagged union), permitiendo a TypeScript estrechar el tipo de forma 100% segura en tiempo de compilación.
- Cada variante tiene propiedades específicas que solo existen cuando corresponde su estado.

**Interfaces de la unión:**
```typescript
interface MatriculaActiva {
  tipo: "ACTIVA";
  asignaturas: Asignatura[];
}

interface MatriculaSuspendida {
  tipo: "SUSPENDIDA";
  motivo: string;
}

interface MatriculaFinalizada {
  tipo: "FINALIZADA";
  notaMedia: number;
}
```

### Interfaz Genérica - RespuestaAPI

```typescript
export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}
```

**¿Por qué genéricos?**
- El genérico `<T>` permite que el tipo de `datos` se defina en el momento de uso.
- La misma interfaz sirve para cualquier entidad (Estudiante, Asignatura, etc.)
- Se evita el uso de `any` manteniendo la seguridad de tipos.

**Ejemplo de uso:**
```typescript
const respuesta: RespuestaAPI<Estudiante> = await apiClient.obtenerRecurso('/estudiantes/1');
// respuesta.datos es de tipo Estudiante
```

## Servicio Genérico - APIClient

### Clase APIClient

```typescript
export class APIClient {
  async obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> { ... }
  async listarRecursos<T>(endpoint: string): Promise<RespuestaAPI<T[]>> { ... }
}
```

**Decisiones de diseño:**
- **Clase vs módulo de funciones:** La clase permite mantener estado (baseUrl, datos simulados) y es más fácil de inyectar como dependencia.
- **Método genérico:** `<T>` parametrizable permite reutilizar la lógica para cualquier endpoint.
- **Simulación de API:** Usa `setTimeout` para simular latencia real.
- **Almacenamiento en Map:** Permite guardar y recuperar entidades por endpoint.

### Métodos

| Método | Descripción |
|--------|-------------|
| `obtenerRecurso<T>(endpoint)` | Obtiene un recurso específico |
| `listarRecursos<T>(endpoint)` | Lista recursos que empiezan por el endpoint |

### Manejo de Errores

La API retorna errores con código 404 cuando el recurso no existe:

```typescript
{
  codigoEstado: 404,
  exito: false,
  datos: null,
  errores: ["Recurso no encontrado: /estudiantes/NO-EXISTE"]
}
```

## Análisis Exhaustivo con `never`

La función `generarReporte` implementa el patrón de **exhaustive checking**:

```typescript
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
```

**Beneficios:**
- **Type narrowing:** No requiere `as` - TypeScript infiere automáticamente el tipo dentro de cada case.
- **Seguridad futura:** Si se añade un nuevo tipo a `EstadoMatricula` sin actualizar esta función, el compilador mostrará un error.
- **Mantenibilidad:** Garantiza que ningún caso queda sin manejar.

## Resumen de Decisiones Arquitectónicas

| Concepto | Elección | Razón |
|----------|----------|-------|
| Entidades (Estudiante, Asignatura) | `interface` | Contratos estructurales, permite extensión |
| EstadoMatricula | `type` (unión) | Unión de tipos, no posible con interface |
| generarReporte | switch + never | Exhaustiveness checking para escalabilidad |
| RespuestaAPI | `interface` + genérico `<T>` | Reutilizable para cualquier entidad |
| APIClient | `class` con Map | Estado reutilizable, inyección de dependencias |

## Ejemplo Completo de Uso

```typescript
import { apiClient } from './services/api-client';
import { Estudiante, Asignatura } from './domain/types';
import { MatriculaActiva, MatriculaFinalizada } from './domain/types/matricula';
import { generarReporte } from './domain/types/reporte';

// Obtener recurso
const estudiante = await apiClient.obtenerRecurso<Estudiante>('/estudiantes/EST-001');
console.log(estudiante.datos);

// Listar recursos
const asignaturas = await apiClient.listarRecursos<Asignatura>('/asignaturas');

// Generar reporte
const matricula: MatriculaFinalizada = { tipo: "FINALIZADA", notaMedia: 8.5 };
console.log(generarReporte(matricula));
```

## Compilación y Ejecución

```bash
# Compilar
npx tsc

# Ejecutar directamente
npx tsx src/index.ts

# Verificar tipos sin compilar
npx tsc --noEmit
```
