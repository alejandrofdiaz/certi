import axios from './ws';

class CaptchaApi {
  public responseKey: string;
  public validate(response): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8080/testCaptcha`, { params: { response } }).then(
        ({ data }) => {
          if (data.responseCode === 0) {
            this.responseKey = response;
            resolve(true);
          } else resolve(false);
        },
        response => {
          reject(response);
        }
      );
    });
  }
}

export const _CaptchaApi = new CaptchaApi();
