import { isString } from 'lodash';
import { LocationExchange } from '../model/location.model';
import axios from 'axios';

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

const GoogleStaticDefaultParams: GoogleStaticApiParams = {
	zoom: 15,
	scale: 2,
	height: 640,
	width: 640,
	format: 'jpg',
	maptype: 'roadmap',
	language: 'es'
}

export const getStaticSituation: Function =
	(location: string | google.maps.LatLng, params: GoogleStaticApiParams): string => {
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
			_params.center = `${String(location.lat)},${String(location.lng)}`;
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

export const suckDataFromGooglePlace =
	(place: google.maps.places.PlaceResult): LocationExchange => {
		let ExchangeObject: LocationExchange = new LocationExchange();
		ExchangeObject.formatted_address = place.formatted_address;
		ExchangeObject.coordinates = place.geometry.location;
		place.address_components
			.forEach(component => {
				component.types
					.forEach(type => {
						switch (type) {
							case 'street_number':
								ExchangeObject.number = component.long_name;
								break;
							case 'route':
								ExchangeObject.route = component.long_name;
								break;
							case 'locality':
								ExchangeObject.locality = component.long_name;
								break;
							case 'administrative_area_level_2':
								ExchangeObject.province = component.long_name;
								break;
							case 'administrative_area_level_1':
								ExchangeObject.state = component.long_name;
								break;
							case 'country':
								ExchangeObject.country = component.long_name;
								break;
							case 'postal_code':
								ExchangeObject.postal_code = component.long_name;
								break;
							default:
								break;
						}
					})
			});
		return ExchangeObject;
	}

export const goggleImageAsALink
	= (place: LocationExchange) => {
		const url = getStaticSituation(place.formatted_address, GoogleStaticDefaultParams);
		return new Promise((resolve, reject) => {
			axios
				.get(url, { responseType: 'arraybuffer' })
				.then((response) => {
					resolve(
					`<a href="${_imageEncode(response.data, response.headers['content-type'])}" 		download="${place.formatted_address}_SIT.jpg" 
						target="_blank" class="button is-primary">
						<span class="icon is-small">
						  <i class="fa fa-map-marker"></i>
						</span>
						<span>Mapa situación</span>						
					  </a>
						`);
				});
		})
	}

const _imageEncode = (arrayBuffer: ArrayBuffer, mimetype: string) => {
	let u8 = new Uint8Array(arrayBuffer),
		b64encoded = btoa([].reduce.call(
			new Uint8Array(arrayBuffer),
			(p, c) => p + String.fromCharCode(c), ''))
	return "data:" + mimetype + ";base64," + b64encoded
}