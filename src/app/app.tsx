import * as React from 'react';

interface AppState {

}

export default class App extends React.Component<any, AppState>{
	constructor() {
		super();
	}


	render() {
		return (<div className='hero-body'>Esto es una prueba!</div>)
	}
}