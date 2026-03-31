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

**Ejemplo de narrowing:**
```typescript
function procesar(estado: EstadoMatricula) {
  if (estado.tipo === "ACTIVA") {
    // TypeScript sabe que estado.asignaturas existe aquí
  }
}
```

## Servicio Genérico - APIClient

### Interfaz Genérica RespuestaAPI

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

### Clase APIClient

```typescript
export class APIClient {
  async obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> { ... }
}
```

**Decisiones de diseño:**
- **Clase vs módulo de funciones:** La clase permite mantener estado (baseUrl) y es más fácil de inyectar como dependencia.
- **Método genérico:** `<T>` parametrizable permite reutilizar la lógica para cualquier endpoint.
- **Promesas con setTimeout:** Simula el comportamiento real de una API asíncrona.

## Resumen de decisiones arquitectónicas

| Concepto | Elección | Razón |
|----------|----------|-------|
| Entidades (Estudiante, Asignatura) | `interface` | Contratos estructurales, permite extensión |
| EstadoMatricula | `type` (unión) | Unión de tipos, no posible con interface |
| RespuestaAPI | `interface` + genérico `<T>` | Reutilizable para cualquier entidad |
| APIClient | `class` | Estado reutilizable, inyección de dependencias |
