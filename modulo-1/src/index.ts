import { 
  calcularMedia, 
  calcularMediana, 
  calcularModa,
  calcularVarianza,
  calcularDesviacionEstandar,
  calcularRango,
  filtrarAtipicos,
  obtenerEstadisticas
} from './math-utils';

const datosPrueba = [10, 20, 30, 40, 50, 1000];
const datosNormales = [5, 7, 8, 9, 10, 12, 15];

console.log('=== Datos de prueba ===');
console.log('Con atípico:', datosPrueba);
console.log('Normales:', datosNormales);

console.log('\n--- Funciones individuales ---');
console.log('Media:', calcularMedia(datosPrueba));
console.log('Mediana:', calcularMediana(datosPrueba));
console.log('Moda:', calcularModa(datosPrueba));
console.log('Varianza:', calcularVarianza(datosPrueba));
console.log('Desviación estándar:', calcularDesviacionEstandar(datosPrueba));
console.log('Rango:', calcularRango(datosPrueba));

console.log('\n--- Filtrado de atípicos ---');
console.log('Atípicos (límite 50):', filtrarAtipicos(datosPrueba, 50));
console.log('Atípicos (límite 200):', filtrarAtipicos(datosPrueba, 200));

console.log('\n--- Función completa (obtenerEstadisticas) ---');
console.log(obtenerEstadisticas(datosNormales));

console.log('\n--- Casos límite ---');
console.log('Media de array vacío:', calcularMedia([]));
console.log('Mediana de array vacío:', calcularMediana([]));
console.log('Moda de array vacío:', calcularModa([]));
console.log('Varianza de array vacío:', calcularVarianza([]));
console.log('Desviación estándar de array vacío:', calcularDesviacionEstandar([]));
console.log('Rango de array vacío:', calcularRango([]));
console.log('Filtrar atípicos de array vacío:', filtrarAtipicos([], 10));
