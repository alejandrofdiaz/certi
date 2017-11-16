const parser = require('./parser')
const contentHtml = require('./contentHtml')
const fs = require('fs');
const path = require('path');

const xml = fs.readFileSync(path.resolve(__dirname, '../../docs/Ejemplo estudio/RESUMEN.xml'), { encoding: 'utf8' });

const parsed = parser.parseDataFromSummary(xml);
console.log(parsed);


// const test = new parser.SummaryCertificado();

// test.anio = 1888;
// test.normativa = 'hooola';
// test.comunidadAutonoma = '231233';
// test.referenciaCatastral = '3213213';
// test.generateResumen();
// contentHtml.fillWithData(test)           