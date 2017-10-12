import * as React from 'react';
import Sections from '../common/pageSections';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';
import { suckDataFromGooglePlace, goggleImageAsALink } from '../api/maps';
import { _CaptchaApi } from '../api/captcha.api';
import { _CatastroApi } from '../api/catastro.api';
import jump from 'jump.js';


interface theme {
	root: string;
	container: string;
	map: string;
	form_wrapper: string;
	input_wrapper: string;
	input: string;
	captcha: string;
	isLoading: string;
}

const theme: theme = {
	root: 'hero is-large map__root',
	container: 'hero-body map__container',
	map: 'map',
	form_wrapper: 'map__form--wrapper control',
	input_wrapper: 'map__input--wrapper control',
	input: 'input map__input',
	captcha: 'g-recaptcha',
	isLoading: 'is-loading'
}

interface State {
	place: google.maps.places.PlaceResult;
	address: string;
	disableForm: boolean;
	isLoading: boolean;
}

interface Props {
	setCatastroElements: (elements: CatastroSimplifiedElement[]) => void
}

export class Map extends React.Component<Props, State>{
	map: google.maps.Map;
	autocomplete: google.maps.places.Autocomplete;
	markers: google.maps.Marker[];
	refs: {
		map: any;
		autocomplete_input: any;
	}

	constructor(props) {
		super(props);
		this.map;
		this.markers = [];
		this.state = {
			isLoading: false,
			address: '',
			place: null,
			disableForm: true
		}
	}

	componentDidMount() {
		document.addEventListener('captchaSuccess', (event: any) => {
			this.setLoading(true);
			_CaptchaApi
				.validate(event.detail.response)
				.then(
				response => {
					if (response) {
						this.enableForm();
					} else {
						this.disableForm()
					}
				}, (response) => { })
				.then(() => { this.setLoading(false) })
		})

		document.addEventListener('captchaExpired', () => {
			this.disableForm()
		})

		const twinpizza: google.maps.LatLng =
			new google.maps.LatLng(40.421223, -3.702151);
		this.map = new google.maps.Map(this.refs.map, {
			zoom: 6,
			center: twinpizza
		});

		this.autocomplete = new google.maps.places.Autocomplete(
			this.refs.autocomplete_input, { types: ['geocode'] }
		)

		this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
	}

	setLoading(state: boolean) {
		this.setState({ isLoading: state });
	}

	updateAddress(Event) {
		const value = Event.target.value;
		this.setState({ address: value });
	}

	removeMarksFromMap(marker) {
		this.markers.forEach(marker => { marker.setMap(null) });
		this.markers.push(marker);
	}

	fillInAddress() {
		let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

		if (place.geometry) {
			const [lat, long] = [place.geometry.location.lat(), place.geometry.location.lng()]
			this.setState({ place, isLoading: true });


			_CatastroApi
				.getReferencias(lat, long)
				.then(
				({ data }: { data: CatastroSimplifiedElement[] }) => {
					this.props.setCatastroElements(data);

					jump(`#${Sections.rc_selector}`)
				},
				response => { })


			this.map.setCenter(
				place.geometry.location
			);
			this.map.setZoom(20);

			goggleImageAsALink(suckDataFromGooglePlace(place))
				.then(
				(googleStaticLinks: any) => {
					let infoWindow = new google.maps.InfoWindow({
						content: `
						<div class="title is-6">${place.formatted_address}</div> 
						${this.renderStatic(googleStaticLinks.situation)}
						${this.renderStreetView(googleStaticLinks.streetView)}`
					})

					const marker = new google.maps.Marker({
						map: this.map,
						position: place.geometry.location,
						title: 'Inmueble seleccionado!'
					});

					this.removeMarksFromMap(marker);

					this.markers = [marker];
					infoWindow.open(this.map, marker);

					marker.addListener('click', function () {
						infoWindow.open(this.map, marker);
					});
				})
				.then(() => { this.setState({ isLoading: false }) })
		}
	}

	private disableForm = () => {
		this.setState({ disableForm: true });
	}

	private enableForm = () => {
		this.setState({ disableForm: false });
	}

	private renderStatic(url: string) {
		return (
			`<a href="${url}" 
				download="${this.state.place.formatted_address}_SIT.jpg" 
				target="_blank" class="button is-primary">
				<span class="icon is-small">
		 			 <i class="fa fa-map-marker"></i>
				</span>
				<span>Mapa situación</span>						
	 		 </a>`)
	}

	private renderStreetView(url: string) {
		return (
			`<a href="${url}" 
				download="${this.state.place.formatted_address}_FACHADA.jpg" 
				target="_blank" class="button is-info">
				<span class="icon is-small">
		 			 <i class="fa fa-camera"></i>
				</span>
				<span>Foto fachada</span>						
	 		 </a>`)
	}

	private isLoadingWrapper(isLoading: boolean): string {
		return isLoading ? theme.isLoading : '';
	}


	render() {
		const Captcha = () => {
			if (this.state && this.state.disableForm) {
				return (<div key='recaptcha'
					className={theme.captcha}
					data-sitekey={process.env.GOOGLE_CAPTCHA_KEY}
					data-callback='captchaSuccess'
					data-expired-callback='captchaExpired'></div>)
			} else
				return null
		}

		return (
			<section
				id='address_form'
				className={theme.root}>
				<div ref='map'
					key='map'
					className={[theme.container, theme.map].join(' ')}></div>
				<div className={
					[theme.form_wrapper].join(' ')}>
					<div className={
						[theme.input_wrapper, this.isLoadingWrapper(this.state.isLoading)].join(' ')
					}>
						<input
							disabled={this.state.disableForm}
							ref='autocomplete_input'
							type='text'
							className={theme.input}
							placeholder='Inserta tu dirección'
							value={this.state.address}
							onChange={this.updateAddress.bind(this)} />
					</div>

					<Captcha />
				</div>
			</section>
		)
	}
}