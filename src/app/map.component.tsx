import * as React from 'react';

import Sections from '../common/pageSections';
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

import { goggleImageAsALink } from '../api/maps';
import { _CaptchaApi } from '../api/captcha.api';
import { _CatastroApi } from '../api/catastro.api';

import Captcha from './captcha.component';
const GOOGLE_CAPTCHA_KEY = process.env.GOOGLE_CAPTCHA_KEY;

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
};

interface State {
  place: google.maps.places.PlaceResult;
  address: string;
  disableForm: boolean;
  isLoading: boolean;
}

interface Props {
  setCatastroElements: (elements: CatastroSimplifiedElement[]) => void;
}

export class Map extends React.Component<Props, State> {
  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  markers: google.maps.Marker[];
  refs: {
    map: any;
    autocomplete_input: any;
  };

  constructor(props) {
    super(props);
    this.markers = [];
    this.state = {
      isLoading: false,
      address: '',
      place: null,
      disableForm: true
    };

    this.fillInAddress = this.fillInAddress.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.disableForm = this.disableForm.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.showLocationBubble = this.showLocationBubble.bind(this);
    this.requestReferencias = this.requestReferencias.bind(this);
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
              this.disableForm();
            }
          },
          response => {}
        )
        .then(() => {
          this.setLoading(false);
        });
    });

    document.addEventListener('captchaExpired', () => {
      this.disableForm();
    });

    const twinpizza: google.maps.LatLng = new google.maps.LatLng(40.421223, -3.702151);
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 6,
      center: twinpizza
    });

    this.map.addListener('click', (e: google.maps.MouseEvent) => {
      if (!this.state.disableForm) {
        this.showLocationBubble(e.latLng);
        this.requestReferencias(e.latLng);
      }
    });

    this.autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete_input, {
      types: ['geocode']
    });

    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  setLoading(state: boolean) {
    this.setState({ isLoading: state });
  }

  updateAddress(Event) {
    const value = Event.target.value;
    this.setState({ address: value });
  }

  setIndividualMarker(marker) {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers.push(marker);
  }

  createInfoWindow(content: string) {
    return new google.maps.InfoWindow({ content });
  }

  createMarker(location: google.maps.LatLng, onclick, title?: string) {
    const _title = title || location.toString();

    let marker = new google.maps.Marker({
      map: this.map,
      position: location,
      title: _title
    });

    marker.addListener('click', onclick);

    return marker;
  }

  showLocationBubble(place: google.maps.LatLng, title?: string) {
    const _title = title || place.toString();

    this.map.setCenter(place);
    this.map.setZoom(20);

    return new Promise((resolve, reject) => {
      goggleImageAsALink(place).then(
        googleStaticLinks => {
          const info_window_content = `
          <div class="title is-6">${_title}</div>
          ${this.renderStatic(googleStaticLinks.situation, _title)}
          ${this.renderStreetView(googleStaticLinks.streetView, _title)}`;

          let infoWindow = this.createInfoWindow(info_window_content);
          const marker = this.createMarker(place, function() {
            infoWindow.open(this.map, marker);
          });

          this.setIndividualMarker(marker);

          this.markers = [marker];

          infoWindow.open(this.map, marker);
          resolve();
        },
        err => reject()
      );
    });
  }

  fillInAddress() {
    let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

    if (place.geometry) {
      this.setState({ place, isLoading: true });

      this.requestReferencias(place.geometry.location);

      this.showLocationBubble(place.geometry.location, place.formatted_address)
        .then()
        .then(() => this.setState({ isLoading: false }));
    }
  }

  requestReferencias(place: google.maps.LatLng) {
    const [lat, long] = [place.lat(), place.lng()];

    _CatastroApi.getReferencias(lat, long).then(
      data => {
        this.props.setCatastroElements(data);
        jump(`#${Sections.rc_selector}`);
      },
      response => {}
    );
  }

  private disableForm() {
    this.setState({ disableForm: true });
  }

  private enableForm() {
    this.setState({ disableForm: false });
  }

  private renderStatic(url: string, name: string) {
    return `<a href="${url}"
				download="${name}_SIT.jpg"
				target="_blank" class="button is-primary">
				<span class="icon is-small">
		 			 <i class="fa fa-map-marker"></i>
				</span>
				<span>Mapa situación</span>
	 		 </a>`;
  }

  private renderStreetView(url: string, name: string) {
    return `<a href="${url}"
				download="${name}_FACHADA.jpg"
				target="_blank" class="button is-info">
				<span class="icon is-small">
		 			 <i class="fa fa-camera"></i>
				</span>
				<span>Foto fachada</span>
	 		 </a>`;
  }

  private isLoadingWrapper(isLoading: boolean): string {
    return isLoading ? theme.isLoading : '';
  }

  render() {
    const Captcha_ = () => {
      const isVisible = this.state && this.state.disableForm;
      return <Captcha active={isVisible} className={theme.captcha} siteKey={GOOGLE_CAPTCHA_KEY} />;
    };

    return (
      <section id="address_form" className={theme.root}>
        <div ref="map" key="map" className={[theme.container, theme.map].join(' ')} />
        <div className={[theme.form_wrapper].join(' ')}>
          <div
            className={[theme.input_wrapper, this.isLoadingWrapper(this.state.isLoading)].join(' ')}
          >
            <input
              disabled={this.state.disableForm}
              ref="autocomplete_input"
              type="text"
              className={theme.input}
              placeholder="Inserta tu dirección"
              value={this.state.address}
              onChange={this.updateAddress.bind(this)}
            />
          </div>

          <Captcha_ />
        </div>
      </section>
    );
  }
}
