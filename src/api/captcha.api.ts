import axios from 'axios';


class CaptchaApi {
	public validate(response): Promise<boolean> {
		return new Promise((resolve, reject) => {
			axios
				.get(`http://localhost:8080/testCaptcha`, { params: { response } })
				.then(
				({ data }) => {
					if (data.responseCode === 0) {
						resolve(true)
					} else
						resolve(false)
				},
				response => { reject(response) })
		})
	}
}


export const _CaptchaApi = new CaptchaApi();