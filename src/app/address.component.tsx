import * as React from 'react';
import { MunicipioSuggestion } from './municipio.field';

interface Props {

}

class Field {
	value: string;
	label: string;
	disabled: boolean;
	validation: string;
	validationText: string;
	constructor() {
		this.value = '';
		this.label = '';
		this.disabled = false;
		this.validation = '';
		this.validationText = '';
	}
}


interface State {
	comunidadField: Field;
	provinciaField: Field;
	municipioField: Field;
	calleField: Field;
	numeroField: Field;
}

export default class AddressForm extends React.Component<Props, State>{
	constructor() {
		super();
		this.state = {
			comunidadField: new Field(),
			provinciaField: new Field(),
			municipioField: new Field(),
			calleField: new Field(),
			numeroField: new Field()
		}
	}

	handleChange() {

	}

	render() {
		return (
			<form id='address'>
				<h1 className='title has-text-centered'>Datos Inmueble</h1>
				<div className='field is-horizontal direction-form'>
					<div className='field-body'>
						<div className='field'>
							<div className='control'>
								<MunicipioSuggestion />
							</div>
						</div>
						<div className='field'>
							<div className='control has-icons-left has-icons-right'>
								<input className='input'
									type='text'
									placeholder='Provincia'
									value='' />
								<span className='icon is-small is-left'>
									<i className='fa fa-map-marker'></i> </span>
							</div>
						</div>
					</div>
				</div>
				<div className='field'>
					<label className='label is-large'>Municipio</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input'
							type='text'
							placeholder='municipio válido'
							value='' />
						<span className='icon is-small is-left'>
							<i className='fa fa-university'></i>
						</span>
					</div>
					<p className='help'>El municipio es válido</p>
				</div>
				<div className='field is-horizontal direction-form'>
					<div className='field-label is-normal direction-form__label'>
						<label className='label'>Dirección</label>
					</div>
					<div className='field-body'>
						<div className='field direction-form__address'>
							<div className='control has-icons-left has-icons-right'>
								<input className='input'
									type='text'
									placeholder='dirección válida'
									value='' />
								<span className='icon is-small is-left'>
									<i className='fa fa-map-marker'></i>
								</span>
							</div>
							<p className='help'>La dirección no es válida</p>
						</div>
						<div className='field direction-form__number'>
							<div className='control has-icons-left has-icons-right'>
								<input className='input'
									type='number'
									placeholder='número'
									value='' />
								<span className='icon is-small is-left'>
									<i className='fa fa-map-marker'></i>
								</span>
							</div>
						</div>
					</div>
				</div>
			</form>)
	}
}



const languages = [
	{
		name: 'C',
		year: 1972
	},
	{
		name: 'Elm',
		year: 2012
	},
];