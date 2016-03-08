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
          <div className="input-group email">
            <input className="clear-input" type="text" placeholder="Password" />
          </div>
          <div className="input-group email">
            <input className="clear-input" type="text" placeholder="Name Displayed to Voters" />
          </div>
        </div>
      </div>
    );
  }
}
