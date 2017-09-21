import * as React from 'react';
import AddressForm from './address.component';

interface AppState {

}

export default class App extends React.Component<any, AppState>{
	constructor() {
		super();
	}


	render() {
		return (<div className='hero-body'>
			<div className="container">
				<AddressForm />
			</div>
		</div>)
	}
}