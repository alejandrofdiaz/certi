import axios from './ws';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

class CatastroApi {
  constructor() {}

  getMunicipio(Provincia: string, Municipio?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/getCatastro').then(response => {
        resolve(response);
      });
    });
  }

  getReferencias(lat: number, long: number): Promise<CatastroSimplifiedElement[]> {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/getRC', { params: { lat, long } }).then(response => {
        const data = response.data.map(e => {
          return new CatastroSimplifiedElement(e);
        });

        resolve(data);
      });
    });
  }

  getDNPRC(data: CatastroSimplifiedElement) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/getDNPPP', { params: data }).then(response => {
        resolve(response);
      });
    });
  }
}

export const _CatastroApi = new CatastroApi();
