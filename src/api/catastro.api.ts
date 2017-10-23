import axios from 'axios';
import { xml2js } from 'xml-js';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

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
				.get(
				'http://localhost:8080/getCatastro')
				.then(response => {
					resolve(response)
				})
		});
	}

	getReferencias(lat: number, long: number): Promise<any> {
		return new Promise((resolve, reject) => {
			axios
				.get(
				'http://localhost:8080/getRC',
				{ params: { lat, long } })
				.then(response => {
					resolve(response)
				})
		});
	}

	getDNPRC(data: CatastroSimplifiedElement) {
		return new Promise((resolve, reject) => {
			axios
				.get(
				'http://localhost:8080/getDNPPP',
				{ params: data })
				.then(response => {
					resolve(response)
				})
		});
	}
}

export const _CatastroApi = new CatastroApi();
