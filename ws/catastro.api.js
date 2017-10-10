const request = require('request');
const utm = require('utm').fromLatLon;
const xmlToJS = require('xml-js').xml2js;

const URL_BASE_CATASTRO = 'http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/';

module.exports = {
	getMunicipios: provincia => {
		const [service, action] = ['ovccallejero.asmx', 'ConsultaMunicipio']
		const options = {
			url: `${URL_BASE_CATASTRO}${service}/${action}`,
			method: 'POST',
			formData: {
				Provincia: 'Madrid', Municipio: ''
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		}


		return new Promise((resolve, reject) => {
			request
				.post(options, (err, httpResponse, body) => {
					resolve(httpResponse);
				})
		})
	},
	getReferenciasCatastrales: (lat, long) => {
		const [service, action] = ['ovccoordenadas.asmx', 'Consulta_RCCOOR']

		const SRS = {
			27: 'EPSG:32627',
			28: 'EPSG:32628',
			29: 'EPSG:32629',
			30: 'EPSG:32630',
			31: 'EPSG:32631',
		}
		const CONVERSION = utm(Number(lat), Number(long));
		const DATA = {
			lat: CONVERSION.easting,
			long: CONVERSION.northing,
			zone: CONVERSION.zoneNum
		}


		const options = {
			url: `${URL_BASE_CATASTRO}${service}/${action}`,
			method: 'GET',
			qs: {
				Coordenada_X: DATA.lat, Coordenada_Y: DATA.long, SRS: SRS[DATA.zone]
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		}
		return new Promise((resolve, reject) => {
			request
				.get(options, (err, httpResponse, body) => {
					const _body = xmlToJS(body);
					console.log(_body);
					resolve(_body);
				})
		})




	}
}