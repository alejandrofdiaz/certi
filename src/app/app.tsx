/**
 * Libraries
 */
import * as React from 'react';

/**
 * Components
 */
import { Map } from './map.component';
import { RCSelector } from './rcselector.component';

/**
 * Models
 */
import { CatastroSimplifiedElement } from '../model/CatastroSimplifiedElement';

/**
 * Constants
 */
const GOOGLE_CAPTCHA_KEY = process.env.GOOGLE_CAPTCHA_KEY;

interface AppState {
  catastroSelectableElements: CatastroSimplifiedElement[];
  catastroSelectedElement: any;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();

    this.state = {
      catastroSelectableElements: [],
      catastroSelectedElement: {}
    };
  }

  selectCatastroElements(catastroSelectableElements: CatastroSimplifiedElement[]) {
    this.setState({ catastroSelectableElements });
  }

  render() {
    return (
      <div className="app_container">
        <Map
          setCatastroElements={this.selectCatastroElements.bind(this)}
          siteKey={GOOGLE_CAPTCHA_KEY}
          country={'ES'}
        />
        <RCSelector
          SelectRC={console.log}
          CatastroElements={this.state.catastroSelectableElements}
        />
      </div>
    );
  }
}
