import { calcularMedia, calcularMediana, filtrarAtipicos } from './math-utils';

const datosPrueba = [10, 20, 30, 40, 50, 1000];

console.log('Datos de prueba:', datosPrueba);

const media = calcularMedia(datosPrueba);
console.log('Media:', media);

const mediana = calcularMediana(datosPrueba);
console.log('Mediana:', mediana);

const filtrados = filtrarAtipicos(datosPrueba, 50);
console.log('Atípicos (límite 50):', filtrados);

console.log('--- Casos límite ---');

console.log('Media de array vacío:', calcularMedia([]));
console.log('Mediana de array vacío:', calcularMediana([]));
