import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { hideLogin } from '../actions/userActions';
import '../styles/_Login.scss';

class Login extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    hideLogin: PropTypes.func.isRequired,
  }

  componentWillMount() {
  }

  onClick(e) {
    // clicked on background area
    if (findDOMNode(this) === e.target) this.props.hideLogin();
  }

  render() {
    // const rootClass = this.props.user.showLogin ? 'show' : '';
    const rootClass = '';

    return (
      <div id="Login" className={rootClass} style={this.props.style} onClick={this.onClick.bind(this)}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    hideLogin: () => (dispatch(hideLogin())),
  };
};

export default connect(null, mapDispatchToProps)(Login);
