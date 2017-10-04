const request = require('request');

module.exports = {
	getMunicipios: provincia => {
		return new Promise((resolve, reject) => {
			request
				.post(
				'http://ovc.catastro.meh.es//ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx/ConsultaMunicipio', { Provincia: 'Madrid', Municipio: '' })
				.on('response', response => {
					resolve(response);
				});
		})
	}
}