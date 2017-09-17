import './content/styles/main.scss';
import './common/ui';
import Vue from 'vue';

import './api/maps';

new Vue({
	el: '#app',
	render(h) {
		return (<h1>Hello world</h1>)
	}
})