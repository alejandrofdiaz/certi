import axios from './ws';

class CeePDFApi {
  private BASE_URL: string;
  private GETPDF_URL: string;
  constructor() {
    this.BASE_URL = 'http://localhost:8080/';
    this.GETPDF_URL = 'retrieveEtiquetaPDF';
  }

  async getCEEPdf(file: FileList, numRef: string) {
    const formData = new FormData();
    formData.append('xml', file[0]);
    formData.append('numeroReferencia', numRef);
    const result = await axios.post(`${this.BASE_URL}${this.GETPDF_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return result;
  }
}

export default new CeePDFApi();
