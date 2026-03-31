# Documentación del Proyecto TypeScript - Módulo 1

## Funciones Matemáticas Utilities

Este módulo implementa un conjunto de funciones para análisis estadístico con tipado estricto.

### Tipos y Interfaces

```typescript
export type Numero = number;

export interface ResultadoEstadistico {
  valor: number | null;
  esValido: boolean;
}
```

### Funciones Implementadas

#### calcularMedia
Calcula la media aritmética de un conjunto de datos.

```typescript
function calcularMedia(datos: readonly number[]): number | null
```

- **Parámetro:** `datos` - Array de números (readonly para inmutabilidad)
- **Retorna:** `number` si hay datos, `null` si está vacío
- **Caso límite:** Array vacío retorna `null`

#### calcularMediana
Calcula la mediana (valor central) de los datos.

```typescript
function calcularMediana(datos: readonly number[]): number | null
```

- **Parámetro:** `datos` - Array de números
- **Retorna:** `number` si hay datos, `null` si está vacío
- **Caso límite:** Array vacío retorna `null`

#### calcularModa
Calcula el valor o valores más frecuentes.

```typescript
function calcularModa(datos: readonly number[]): number[]
```

- Retorna array de modas (puede haber más de una)
- Si todos los valores aparecen igual frecuencia, retorna el primer valor

#### calcularVarianza
Calcula la varianza de los datos.

```typescript
function calcularVarianza(datos: readonly number[]): number | null
```

#### calcularDesviacionEstandar
Calcula la desviación estándar.

```typescript
function calcularDesviacionEstandar(datos: readonly number[]): number | null
```

#### calcularRango
Calcula la diferencia entre el valor máximo y mínimo.

```typescript
function calcularRango(datos: readonly number[]): number | null
```

#### filtrarAtipicos
Filtra valores que exceden un límite respecto a la media.

```typescript
function filtrarAtipicos(datos: readonly number[], limite: number): number[]
```

- **Parámetros:**
  - `datos` - Array de números
  - `limite` - Distancia máxima respecto a la media
- **Retorna:** Array con valores dentro del límite

#### obtenerEstadisticas
Función completa que retorna todas las estadísticas.

```typescript
function obtenerEstadisticas(datos: readonly number[]): {
  media: number | null;
  mediana: number | null;
  moda: number[];
  varianza: number | null;
  desviacionEstandar: number | null;
  rango: number | null;
  total: number;
}
```

### Decisiones de Diseño

| Decisión | Razón |
|----------|-------|
| `readonly number[]` | Inmutabilidad del array de entrada |
| Retorno `null` para casos vacíos | Permite diferenciar "sin datos" de "error" |
| Type alias `Numero` | Semántica para tipos primitivos |
| Interfaz `ResultadoEstadistico` | Estructura reusable para resultados |

### Ejemplo de Uso

```typescript
import { obtenerEstadisticas, filtrarAtipicos } from './math-utils';

const datos = [5, 7, 8, 9, 10, 12, 15];

const stats = obtenerEstadisticas(datos);
console.log(stats.media);     // 9.43
console.log(stats.mediana);    // 9

const filtrados = filtrarAtipicos(datos, 5);
console.log(filtrados);        // [7, 8, 9, 10]
```

### Compilación

```bash
npx tsc          # Compila a JavaScript en dist/
npx tsx src/index.ts  # Ejecuta directamente
```
