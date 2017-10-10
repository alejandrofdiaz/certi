import * as React from 'react';
import AddressForm from './address.component';
import { Map } from './map.component';
import { _CatastroApi } from '../api/catastro.api';


_CatastroApi;
interface AppState {

}

export default class App extends React.Component<{}, AppState>{
	constructor() {
		super();
	}

	render() {
		return (
			<div className='app_container'>
				<Map />
				{/* <section className='hero'>
					<div className='hero-body'>
						<div className='container'>
							<AddressForm />
						</div>
					</div>
				</section> */}
			</div>
		)
	}
}

