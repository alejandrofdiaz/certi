import * as React from 'react';
import Autosuggest from 'react-autosuggest';

const AutosuggestTheme = {
	container: 'react-autosuggest__container',
	containerOpen: 'react-autosuggest__container--open',
	input: 'input',
	inputOpen: 'react-autosuggest__input--open',
	inputFocused: 'react-autosuggest__input--focused',
	suggestionsContainer: 'react-autosuggest__suggestions-container',
	suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
	suggestionsList: 'react-autosuggest__suggestions-list',
	suggestion: 'react-autosuggest__suggestion',
	suggestionFirst: 'react-autosuggest__suggestion--first',
	suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
	sectionContainer: 'react-autosuggest__section-container',
	sectionContainerFirst: 'react-autosuggest__section-container--first',
	sectionTitle: 'react-autosuggest__section-title'
}
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
								<Autosuggest
									suggestions={source}
									inputProps={{
										placeholder: 'Comunidad autónoma',
										value: this.state.comunidadField.value
									}}
									theme={AutosuggestTheme}
								/>
								{/* <Select
									className='input'
									autosize={false}
									name='form-field-name'
									placeholder='Comunidad autónoma'
									value={this.state.comunidadField}
									options={source}
									onChange={(e) => console.log}
								/> */}
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



const source = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
]