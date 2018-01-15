import _axios from 'axios';
import { _CaptchaApi } from './captcha.api';

declare const WS_URL: string;

let axios = _axios.create();

axios.interceptors.request.use(
  config => {
    if (config.params) {
      config.params.captcha = _CaptchaApi.responseKey;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function getFromWs(action: string, params: any): Promise<any> {
  return axios.get(`${WS_URL}${action}`, { params });
}

export { getFromWs };
export default axios;
