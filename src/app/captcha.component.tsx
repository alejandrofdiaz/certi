import * as React from 'react';

interface CaptchaProps {
  active: boolean;
  className: string;
  siteKey: string;
  successCallback?: string;
  expiredCallback?: string;
}

class Captcha extends React.Component<CaptchaProps, {}> {
  DEFAULT_SUCCESS = 'captchaSuccess';
  DEFAULT_EXPIRED = 'captchaExpired';

  SUCCESS_CALLBACK: string;
  EXPIRED_CALLBACK: string;
  KEY: string;

  constructor(props) {
    super(props);

    this.SUCCESS_CALLBACK = this.props.successCallback
      ? this.props.successCallback
      : this.DEFAULT_SUCCESS;
    this.EXPIRED_CALLBACK = this.props.expiredCallback
      ? this.props.successCallback
      : this.DEFAULT_EXPIRED;
    this.KEY = this.props.siteKey;

    if (!this.KEY) {
      throw 'Missing Google Api Key';
    }
  }

  render() {
    if (this.props.active) {
      return (
        <div
          key="recaptcha"
          className={this.props.className}
          data-sitekey={this.props.siteKey}
          data-callback={this.SUCCESS_CALLBACK}
          data-expired-callback={this.EXPIRED_CALLBACK}
        />
      );
    } else {
      return null;
    }
  }
}

export default Captcha;
