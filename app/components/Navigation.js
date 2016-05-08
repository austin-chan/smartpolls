import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showLogin, showSignup, logout } from '../actions/userActions';
import { push } from 'react-router-redux';
import { newPoll } from '../actions/userActions';
import '../styles/_Navigation.scss';

class Navigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onShowLogin = this.onShowLogin.bind(this);
    this.onShowSignup = this.onShowSignup.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onNewPoll = this.onNewPoll.bind(this);
  }

  componentDidMount() {
  }

  onLogout() {
    this.props.dispatch(logout());
  }

  onShowLogin() {
    this.props.dispatch(showLogin());
  }

  onShowSignup() {
    this.props.dispatch(showSignup());
  }

  onNewPoll() {
    this.props.dispatch(newPoll());
  }

  renderNonUserButtons() {
    return (
      <div className="button-list">
        <div className="clear-button button" onClick={this.onShowLogin}>Log In</div>
        <div className="clear-button button" onClick={this.onShowSignup}>Sign Up</div>
      </div>
    );
  }

  renderUserButtons() {
    const pushMyPolls = () => this.props.dispatch(push('/my-polls'));
    const pushMyAccount = () => this.props.dispatch(push('/my-account'));

    return (
      <div className="button-list">
        <div className="link-button button" onClick={this.onLogout}>Logout</div>
        <div className="link-button button" onClick={pushMyAccount}>My Account</div>
        <div className="link-button button" onClick={pushMyPolls}>My Polls</div>
        <div className="clear-button button" onClick={this.onNewPoll}>New Poll
        </div>
      </div>
    );
  }

  render() {
    const { isUser } = this.props.user;

    return (
      <div id="Navigation">
        <div className="container">
          <div className="left-side">
            <div className="logo">
              <Link to={'/'}>
                <span className="vertical-aligner" />
                <img className="logo-image" src="https://placehold.it/100x100" />
                <div className="logo-text">Smartpolls</div>
              </Link>
            </div>
          </div>
          <div className="right-side">
            <span className="vertical-aligner" />
            {isUser ? this.renderUserButtons() : this.renderNonUserButtons()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Navigation);
