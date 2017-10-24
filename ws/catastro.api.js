const request = require('request');
const utm = require('utm').fromLatLon;
const xmlToJS = require('xml-js').xml2js;
const municipiosApi = require('./municipios.api');

const URL_BASE_CATASTRO = 'http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/';

class CatastroSimplifiedElement {
	// pc1; //POSICIONES 1-7 DE LA REFERENCIA CATASTRAL (RC) DEL INMUEBLE</pc1>
	// pc2; //POSICIONES 8-14 DE LA RC DEL INMUEBLE
	// cp; //Código INE de Provincia
	// cm; //Código INE de Municipio
	// cv; //Código de vía
	// pnp; //Primer número de policía
	// ldt; //DIRECCIÓN (CALLE, NÚMERO, MUNICIPIO O POLÍGONO, PARCELA Y MUNICIPIO) DE LA PARCELA
	// dist; //Distancia en Metros
	constructor() {
		this.pc1 = ''
		this.pc2 = ''
		this.cp = ''
		this.cm = ''
		this.cv = ''
		this.pnp = ''
		this.ldt = ''
		this.dis = 0
	}

	getRC() {
		return `${this.pc1}${this.pc2}`
	}
}

class Subparcela {
	constructor() {
		this.cspr = ''; //código de subparcela
		this.dspr = ''; //datos de subparcela
		this.ccc = ''; //calificación catastral
		this.dcc = ''; //<dcc>DENOMINACIÓN DE LA CLASE CULTIVO</dcc>
		this.ip = ''; //<ip>INTENSIDAD PRODUCTIVA</ip>
		this.ssp = ''; //<ssp>SUPERFICIE DE LA SUBPARCELA EN METROS CUADRADOS</ssp>
	}
}

class UnidadConstructiva {
	constructor() {
		this.lcd = '';
		this.es = ''; //escalera
		this.pt = ''; //planta
		this.pu = ''; //puerta
		this.stl = ''; //superficie de la unidad constructiva
		this.stl = ''; //superficie elementos comunes
		this.lsrp = []; //lista de subparcelas
	}
}

class ConsultaDNP {
	constructor() {
		this.cn = ''; //<cn>TIPO DE BIEN INMUEBLE</cn>		
		this.pc1 = ''; //<pc1> POSICIONES 1-7 DE LA REFERENCIA CATASTRAL (RC) DEL INMUEBLE</pc1>		
		this.pc2 = ''; //<pc2>POSICIONES 8-14 DE LA RC DEL INMUEBLE</pc1>		
		this.car = ''; //<car>POSICIONES 15-19 DE LA RC (CARGO)</car>		
		this.cc1 = ''; //<cc1>PRIMER DÍGITO DE CONTROL DE LA RC</cc1>		
		this.cc2 = ''; //<cc2>SEGUNDO DÍGITO DE CONTROL DE LA RC </cc2>		
		this.cm = ''; //código municipio
		this.cp = ''; //código provincia
		this.cmc = '';
		this.np = ''; //nombre provincia
		this.np = ''; //nombre municipio
		this.dir = {
			cv: '',
			tv: '', //tipo vía
			nv: '', //nombre vía
			pnp: '' //número
		};
		this.loint = {
			es: '',
			pt: '',
			pu: ''
		};
		this.dp = ''; //código postal
		this.dm = '';
		this.ldt = ''; //calle compuesta
		this.debi = {
			luso: '', //Residencial?
			sfc: '', //SUPERFICIE
			cpt: '', //COEFICIENTE DE PARTICIPACIÓN
			ant: ''  //ANTIGUEDAD
		}
		this.lcons = []; //<lcons>LISTA DE UNIDADES CONSTRUCTIVAS		
	}


}


const refCatastralesXmlHelper = body =>
	xmlToJS(body)
		.elements[0].elements//consulta_coordenadas_distancias
		.find(el => el.name === 'coordenadas_distancias').elements
		.find(el => el.name === 'coordd').elements
		.find(el => el.name === 'lpcd').elements
		.filter(el => el.name === 'pcd')
		.map(_el => {
			let simplifiedElement = new CatastroSimplifiedElement();
			simplifiedElement.pc1 =
				_el.elements
					.find(el => el.name === 'pc').elements
					.find(el => el.name === 'pc1').elements[0].text;
			simplifiedElement.pc2 =
				_el.elements
					.find(el => el.name === 'pc').elements
					.find(el => el.name === 'pc2').elements[0].text;

			simplifiedElement.cp =
				_el.elements
					.find(el => el.name === 'dt').elements
					.find(el => el.name === 'loine').elements
					.find(el => el.name === 'cp').elements[0].text;
			simplifiedElement.cm =
				_el.elements
					.find(el => el.name === 'dt').elements
					.find(el => el.name === 'loine').elements
					.find(el => el.name === 'cm').elements[0].text;
			simplifiedElement.cv =
				_el.elements
					.find(el => el.name === 'dt').elements
					.find(el => el.name === 'lourb').elements
					.find(el => el.name === 'dir').elements
					.find(el => el.name === 'cv').elements[0].text;
			simplifiedElement.pnp =
				_el.elements
					.find(el => el.name === 'dt').elements
					.find(el => el.name === 'lourb').elements
					.find(el => el.name === 'dir').elements
					.find(el => el.name === 'pnp').elements[0].text;
			simplifiedElement.ldt =
				_el.elements
					.find(el => el.name === 'ldt').elements[0].text;
			simplifiedElement.dis =
				_el.elements
					.find(el => el.name === 'dis').elements[0].text;

			return simplifiedElement
		})
		.sort((a, b) => (a.dis - b.dis)) //Ordena ascendente por distancia

const DNPRCXmlHelper = body =>
	xmlToJS(body)
		.elements[0].elements//consulta_dnp 


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
		const [service, action] = ['ovccoordenadas.asmx', 'Consulta_RCCOOR_Distancia']

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
					const _body = refCatastralesXmlHelper(body);
					resolve(_body);
				})
		})
	},
	getCatastroDatosNoProtegidos: inmuebleSeleccionado => {
		const [service, action] = ['ovccallejero.asmx', 'Consulta_DNPRC']
		const [provincia, municipio] =
			[
				municipiosApi.getProvincia(inmuebleSeleccionado.cp),
				municipiosApi.getMunicipio(inmuebleSeleccionado.cp, inmuebleSeleccionado.cm)
			];


		const options = {
			url: `${URL_BASE_CATASTRO}${service}/${action}`,
			method: 'GET',
			qs: {
				Provincia: provincia.value,
				Municipio: municipio.nm,
				RC: `${inmuebleSeleccionado.pc1}${inmuebleSeleccionado.pc2}`
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		}
		return new Promise((resolve, reject) => {
			request
				.get(options, (err, httpResponse, body) => {
					resolve(body);
				})
		})
	}
}