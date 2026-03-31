export type Numero = number;

export interface ResultadoEstadistico {
  valor: number | null;
  esValido: boolean;
}

export function calcularMedia(datos: readonly number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const suma = datos.reduce((acc, valor) => acc + valor, 0);
  return suma / datos.length;
}

export function calcularMediana(datos: readonly number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const ordenados = [...datos].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);
  if (ordenados.length % 2 === 0) {
    return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
  }
  return ordenados[mitad];
}

export function calcularModa(datos: readonly number[]): number[] {
  if (datos.length === 0) {
    return [];
  }
  const frecuencias = new Map<number, number>();
  let maxFreq = 0;
  
  for (const valor of datos) {
    const freq = (frecuencias.get(valor) || 0) + 1;
    frecuencias.set(valor, freq);
    maxFreq = Math.max(maxFreq, freq);
  }
  
  if (maxFreq === 1) {
    return datos.slice(0, 1);
  }
  
  return Array.from(frecuencias.entries())
    .filter(([, freq]) => freq === maxFreq)
    .map(([valor]) => valor);
}

export function calcularVarianza(datos: readonly number[]): number | null {
  const media = calcularMedia(datos);
  if (media === null) {
    return null;
  }
  const sumaCuadrados = datos.reduce((acc, valor) => acc + Math.pow(valor - media, 2), 0);
  return sumaCuadrados / datos.length;
}

export function calcularDesviacionEstandar(datos: readonly number[]): number | null {
  const varianza = calcularVarianza(datos);
  if (varianza === null) {
    return null;
  }
  return Math.sqrt(varianza);
}

export function calcularRango(datos: readonly number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  return max - min;
}

export function filtrarAtipicos(datos: readonly number[], limite: number): number[] {
  const media = calcularMedia(datos);
  if (media === null) {
    return [];
  }
  return datos.filter((valor) => Math.abs(valor - media) <= limite);
}

export function obtenerEstadisticas(datos: readonly number[]): {
  media: number | null;
  mediana: number | null;
  moda: number[];
  varianza: number | null;
  desviacionEstandar: number | null;
  rango: number | null;
  total: number;
} {
  return {
    media: calcularMedia(datos),
    mediana: calcularMediana(datos),
    moda: calcularModa(datos),
    varianza: calcularVarianza(datos),
    desviacionEstandar: calcularDesviacionEstandar(datos),
    rango: calcularRango(datos),
    total: datos.length
  };
}
