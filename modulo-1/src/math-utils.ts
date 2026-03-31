export function calcularMedia(datos: number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const suma = datos.reduce((acc, valor) => acc + valor, 0);
  return suma / datos.length;
}

export function calcularMediana(datos: number[]): number | null {
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

export function filtrarAtipicos(datos: number[], limite: number): number[] {
  const media = calcularMedia(datos);
  if (media === null) {
    return [];
  }
  return datos.filter((valor) => Math.abs(valor - media) <= limite);
}
