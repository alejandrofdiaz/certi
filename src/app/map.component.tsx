import * as React from 'react';
import { suckDataFromGooglePlace, goggleImageAsALink } from '../api/maps';

interface theme {
	root: string;
	container: string;
	map: string;
	input_wrapper: string;
	input: string;
}

interface State {
	place: google.maps.places.PlaceResult;
	address: string;
}

export class Map extends React.Component<{}, State>{
	map: google.maps.Map;
	autocomplete: google.maps.places.Autocomplete;
	markers: google.maps.Marker[];
	theme: theme;
	refs: {
		map: any;
		autocomplete_input: any;
	}

	constructor(props) {
		super(props);
		this.map;
		this.markers = [];
		this.theme = {
			root: 'hero is-large map__root',
			container: 'hero-body map__container',
			map: 'map',
			input_wrapper: 'map__input--wrapper',
			input: 'input map__input'
		}
		this.state = {
			address: '',
			place: null
		}
	}

	componentDidMount() {
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
			this.setState({ place });

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
		}
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
	render() {
		return (
			<section
				id='address_form'
				className={this.theme.root}>
				<div ref='map'
					key='map'
					className={[this.theme.container, this.theme.map].join(' ')}></div>
				<div className={this.theme.input_wrapper}>
					<input
						ref='autocomplete_input'
						type='text'
						className={this.theme.input}
						placeholder='Inserta tu dirección'
						value={this.state.address}
						onChange={this.updateAddress.bind(this)} />
				</div>
			</section>
		)
	}
}