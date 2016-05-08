import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import '../styles/_AccountPage.scss';

class AccountPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {};
 // this.onSaveName = this.onSaveName.bind(this);
    this.onSavePassword = this.onSavePassword.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  // onSaveName() {
  //   const name = findDOMNode(this.refs.nameInput).value;
  //   if (name.length) this.props.dispatch(changeName(name));
  //   else findDOMNode(this.refs.nameInput).value = this.props.name;
  // }

  onSavePassword() {
    const oldPass = findDOMNode(this.refs.oldPassInput).value;
    const newPass = findDOMNode(this.refs.newPassInput).value;
    const confirmPass = findDOMNode(this.refs.confirmPassInput).value;

    if (oldPass.length && newPass.length && confirmPass.length && newPass === confirmPass) {
      this.props.dispatch(changePassword(oldPass, newPass, (message) => {
        this.setState({
          passwordMessage: message,
        });
      }));
    }
  }

  onEnter(f) {
    return (e) => {
      if (e.which === 13) {
        f();
      }
    };
  }

  renderLoading() {
    return (
      <div></div>
    );
  }

  render() {
    // const name = this.props.name;
    let passMessage;

    // if (!name) return this.renderLoading();

    if (this.state.passwordMessage) {
      passMessage = this.state.passwordMessage;
    }


    return (
      <div id="AccountPage">
        <div className="container">
          <div className="hero-card card clearfix">
            <h3>My Account</h3>
            {/*<div className="group">
              <h5>Name to Display to Voters (eg. {name}’s Poll)</h5>
              <div className="input-group">
                <input type="text" className="standard-input session-code-input" ref="nameInput"
                  placeholder="Enter Name" onKeyPress={this.onEnter(this.onSaveName)}
                  defaultValue={name}
                />
              </div>
              <div className="standard-button button large submit" onClick={this.onSaveName}>
                Save Name
              </div>
            </div>
            <hr />*/}
            <div className="group">
              <h5>Old Password</h5>
              <div className="input-group">
                <input type="password" className="standard-input session-code-input"
                  ref="oldPassInput" placeholder="Enter Old Password"
                  onKeyPress={this.onEnter(this.onSavePassword)}
                />
              </div>
              <h5>New Password</h5>
              <div className="input-group">
                <input type="password" className="standard-input session-code-input"
                  ref="newPassInput" placeholder="Enter New Password"
                  onKeyPress={this.onEnter(this.onSavePassword)}
                />
              </div>
              <h5>Confirm New Password</h5>
              <div className="input-group">
                <input type="password" className="standard-input session-code-input"
                  ref="confirmPassInput" placeholder="Enter New Password Again"
                  onKeyPress={this.onEnter(this.onSavePassword)}
                />
              </div>
              <span className="error-message">{passMessage}</span>
              <div className="standard-button button large submit" onClick={this.onSavePassword}>
                Update Password
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AccountPage);
