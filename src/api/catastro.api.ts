import axios from 'axios';
import { xml2js } from 'xml-js';

class CatastroApi {
	private BASE_URL: string;
	private CONSULTA_MUNICIPIOS_URL: string;
	constructor() {
		this.BASE_URL = 'http://ovc.catastro.meh.es';
		this.CONSULTA_MUNICIPIOS_URL =
			'/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/ConsultaMunicipio';
	}

	getMunicipio(Provincia: string, Municipio?: string): Promise<any> {
		interface ConsultaMunicipioParams {
			Provincia: string;
			Municipio?: string;
		}


		return new Promise((resolve, reject) => {
			axios
				.post(
				[this.BASE_URL, this.CONSULTA_MUNICIPIOS_URL].join(''),
				{ Provincia: Provincia, Municipio: '' },
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
				.then(response => {
					resolve(response)
				})
		});
	}
}

export const CatastroApiI = new CatastroApi();

CatastroApiI.getMunicipio('Madrid', '').then(response => { console.log(response) })