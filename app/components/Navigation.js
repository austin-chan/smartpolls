import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showModal, logout } from '../actions/userActions';
import { push } from 'react-router-redux';
import { newPoll } from '../actions/pollActions';
import '../styles/_Navigation.scss';

class Navigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onShowModal = this.onShowModal.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onNewPoll = this.onNewPoll.bind(this);
    this.onMyPolls = this.onMyPolls.bind(this);
  }

  componentDidMount() {
  }

  onLogout() {
    this.props.dispatch(logout());
  }

  onShowModal() {
    this.props.dispatch(showModal());
  }

  onNewPoll() {
    this.props.dispatch(newPoll());
  }

  onMyPolls() {
    this.props.dispatch(push('/my-account'));
  }

  renderNonUserButtons() {
    return (
      <div className="button-list">
        <div className="clear-button button" onClick={this.onShowModal}>Login/Signup</div>
      </div>
    );
  }

  renderUserButtons() {
    return (
      <div className="button-list">
        <div className="link-button button" onClick={this.onLogout}>Logout</div>
        <div className="link-button button">My Account</div>
        <div className="link-button button" onClick={this.onMyPolls}>My Polls</div>
        <div className="clear-button button" onClick={this.onNewPoll}>New Poll</div>
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
                <img className="logo-image" src="http://placehold.it/100x100" />
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
