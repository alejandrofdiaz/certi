import * as React from 'react';
import AddressForm from './address.component';
import { Map } from './map.component';
import { RCSelector } from './rcselector.component';

import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

interface AppState {
	catastroSelectableElements: CatastroSimplifiedElement[];
	catastroSelectedElement: any;
}

export default class App extends React.Component<{}, AppState>{
	constructor() {
		super();

		this.state = {
			catastroSelectableElements: [],
			catastroSelectedElement: {}
		}
	}

	selectCatastroElements(catastroSelectableElements: CatastroSimplifiedElement[]) {
		this.setState({ catastroSelectableElements })
	}

	render() {
		return (
			<div className='app_container'>
				<Map setCatastroElements={this.selectCatastroElements.bind(this)} />
				<RCSelector
					SelectRC={console.log}
					CatastroElements={this.state.catastroSelectableElements} />
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

