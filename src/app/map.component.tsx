import * as React from 'react';
import { suckDataFromGooglePlace } from '../api/maps';

interface theme {
	root: string;
	container: string;
	map: string;
	input_wrapper: string;
	input: string;
}

interface State {
	place: any;
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
			place: {}
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
		let place = this.autocomplete.getPlace();

		if (place.geometry) {
			this.setState({ place });

			this.map.setCenter(
				place.geometry.location
			);
			this.map.setZoom(20);

			let infoWindow = new google.maps.InfoWindow({
				content: place.adr_address
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

			console.log(suckDataFromGooglePlace(place));
		}
	}

	render() {
		return (
			<section
				id='address_form'
				className={this.theme.root}>
				<div ref='map' className={[this.theme.container, this.theme.map].join(' ')}></div>
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