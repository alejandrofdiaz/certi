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

// Imagine you have a list of languages that you'd like to autosuggest.
const municipios = [
	{
		name: 'C',
		year: 1972
	},
	{
		name: 'Cobol',
		year: 1972
	},
	{
		name: 'Elm',
		year: 2012
	}
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : municipios.filter(lang =>
		lang.name.toLowerCase().slice(0, inputLength) === inputValue
	);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
	<div>
		{suggestion.name}
	</div>
);

interface Props {

}

interface State {
	value: string;
	suggestions: Array<any>;
}

export class MunicipioSuggestion extends React.Component<Props, State> {
	constructor() {
		super();

		// Autosuggest is a controlled component.
		// This means that you need to provide an input value
		// and an onChange handler that updates this value (see below).
		// Suggestions also need to be provided to the Autosuggest,
		// and they are initially empty because the Autosuggest is closed.
		this.state = {
			value: '',
			suggestions: []
		};
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Type a programming language',
			value,
			onChange: this.onChange
		};

		// Finally, render it!
		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				theme={AutosuggestTheme}
			/>
		);
	}
}