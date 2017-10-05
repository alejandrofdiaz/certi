const request = require('request');

module.exports = {
	getMunicipios: provincia => {

		const options = {
			url: 'http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/ConsultaMunicipio',
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
	}
}