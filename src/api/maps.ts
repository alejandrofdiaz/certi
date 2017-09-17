import { isString } from 'lodash';

interface CoordinatesS {
	lat: number;
	long: number;
}

interface GoogleStaticApiParams {
	zoom?: number;
	scale?: number;
	height?: number;
	width?: number;
	format?: string;
	maptype?: string;
	language?: string;
	center?: string;
}

export const getStaticSituation: Function =
	(location: string | CoordinatesS, params: GoogleStaticApiParams): string => {
		const
			STATIC_API_URL: string = 'https://maps.googleapis.com/maps/api/staticmap?',
			API_KEY: string = process.env.GOOGLE_API_KEY,
			_params: GoogleStaticApiParams = {
				zoom: params.zoom || 15, //Un valor normal es entre 12 y 20,
				scale: params.scale < 2 && params.scale > 1 ? params.scale : 2,
				height: params.height && params.height < 640 ? params.height : 640,
				width: params.width && params.width < 640 ? params.width : 640,
				format: params.format || 'jpg',
				maptype: params.maptype || 'roadmap',
				language: params.language || 'es'
			};

		if (isString(location)) {
			_params.center = location;
		} else {
			_params.center = `${String(location.lat)},${String(location.long)}`;
		}
		return STATIC_API_URL +
			[
				'center=' + encodeURI(_params.center),
				'zoom=' + _params.zoom,
				'size=' + String(_params.width) + 'x' + String(_params.height),
				'scale=' + String(_params.scale),
				'format=' + _params.format,
				'maptype=' + _params.maptype,
				'language=' + _params.language,
				'markers=' + encodeURI([
					'color:green',
					'label:A',
					_params.center].join('|')),
				'key=' + API_KEY
			].join('&');
	}