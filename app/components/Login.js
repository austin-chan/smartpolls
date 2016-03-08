import React, { Component, PropTypes } from 'react';
import '../styles/_Login.scss';

export default class Login extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div id="Login">
        <span className="vertical-aligner" />
        <div className="wrap">
          <h4>Signup for Smartpolls</h4>
          <div className="input-group email">
            <input className="clear-input" type="text" placeholder="Email Address" />
          </div>
          <div className="input-group password">
            <input className="clear-input" type="password" placeholder="Password" />
            <span className="error-message">Please choose a longer password</span>
          </div>
          <div className="input-group name">
            <input className="clear-input" type="text" placeholder="Name Displayed to Voters" />
          </div>
          <div className="bottom-area">
            <span className="vertical-aligner" />
            <span className="link">Forgot Password?</span>
            <div className="clear-button button">Continue</div>
          </div>
        </div>
      </div>
    );
  }
}
