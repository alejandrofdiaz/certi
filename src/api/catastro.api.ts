import { getFromWs } from './ws';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

class CatastroApi {
  constructor() {}

  getReferencias(lat: number, long: number): Promise<CatastroSimplifiedElement[]> {
    return new Promise((resolve, reject) => {
      const ACTION = 'getRC';
      getFromWs(ACTION, { lat, long }).then(response => {
        const data = response.data.map(e => {
          return new CatastroSimplifiedElement(e);
        });
        resolve(data);
      });
    });
  }

  getDNPRC(data: CatastroSimplifiedElement) {
    const ACTION = 'getDNPPP';

    return new Promise((resolve, reject) => {
      getFromWs(ACTION, data).then(response => {
        resolve(response);
      });
    });
  }
}

export const _CatastroApi = new CatastroApi();
