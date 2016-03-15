import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { spring, presets } from 'react-motion';
import Collapse from 'react-collapse';
import { hideLogin, attemptLogin, attemptSignup } from '../actions/userActions';
import '../styles/_Login.scss';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    showSignup: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  componentDidMount() {
    // workaround to focus
    setTimeout(() => {
      findDOMNode(this.refs.email).focus();
    }, 100);
  }

  onClick(e) {
    // clicked on background area
    if (findDOMNode(this) === e.target) this.props.dispatch(hideLogin());
  }

  onKeyPress(e) {
    if (e.which === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    const email = findDOMNode(this.refs.email).value;
    const password = findDOMNode(this.refs.password).value;

    if (this.props.showSignup) {
      const name = findDOMNode(this.refs.name).value;
      this.props.dispatch(attemptSignup(email, password, name));
    } else {
      this.props.dispatch(attemptLogin(email, password));
    }
  }

  renderEmailField() {
    const emailErrors = {
      INVALID_USER: 'No existing account was found for that email address',
      INVALID_EMAIL: 'Please enter a valid email address',
    };
    const errorText = emailErrors[this.props.error];
    let message;

    if (errorText) {
      message = (<span className="error-message">{errorText}</span>);
    }

    return (
      <div className="input-group email">
        <input className="clear-input" ref="email" type="email" placeholder="Email Address" onKeyPress={this.onKeyPress.bind(this)} />
        {message}
      </div>
    );
  }

  renderPasswordField() {
    const passwordErrors = {
      INVALID_PASSWORD: 'Please enter a valid password',
    };
    const errorText = passwordErrors[this.props.error];
    let message;

    if (errorText) {
      message = (<span className="error-message">{errorText}</span>);
    }

    return (
      <div className="input-group password">
        <input className="clear-input" ref="password" type="password" placeholder="Password" onKeyPress={this.onKeyPress.bind(this)} />
        {message}
      </div>
    );
  }

  renderNameField() {
    const passwordErrors = {
      INVALID_NAME: 'Please enter a name to show voters',
    };
    const errorText = passwordErrors[this.props.error];
    let message;

    if (errorText) {
      message = (<span className="error-message">{errorText}</span>);
    }

    return this.props.showSignup ? (
      <div className="input-group name">
        <input className="clear-input" ref="name" type="text" placeholder="Name Displayed to Voters" onKeyPress={this.onKeyPress.bind(this)} />
        {message}
      </div>
    ) : null;
  }

  render() {
    const title = this.props.showSignup ? 'Signup for Smartpolls' : 'Login/Signup';

    return (
      <div id="Login" style={this.props.style} onClick={this.onClick.bind(this)}>
        <span className="vertical-aligner" />
        <Collapse isOpened springConfig={presets.gentle}>
          <h4>{title}</h4>
          {this.renderEmailField()}
          {this.renderPasswordField()}
          {this.renderNameField()}
          <div className="bottom-area">
            <span className="vertical-aligner" />
            <span className="link">Forgot Password?</span>
            <div className="clear-button button" onClick={this.onSubmit.bind(this)}>Continue</div>
          </div>
        </Collapse>
      </div>
    );
  }

  willEnter() {
    return { opacity: 0 };
  }

  willLeave() {
    return { opacity: spring(0) };
  }
}

function mapStateToProps(state) {
  return {
    showSignup: state.user.showSignup,
    error: state.user.error,
  };
}

export default connect(mapStateToProps)(Login);
