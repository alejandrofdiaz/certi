import _axios from 'axios';
import { _CaptchaApi } from './captcha.api';

let axios = _axios.create();

axios.interceptors.request.use(config => {
	if (config.params) { config.params.captcha = _CaptchaApi.responseKey; }
	return config;
}, error => {
	return Promise.reject(error);
});

export default axios;