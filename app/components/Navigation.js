import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showLogin } from '../actions/userActions';
import '../styles/_Navigation.scss';

class Navigation extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onShowLogin: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log(this.props);
  }

  renderNonUserButtons() {
    return (
      <div className="button-list">
        <div className="clear-button button" onClick={this.props.onShowLogin}>Login/Signup</div>
      </div>
    );
  }

  renderUserButtons() {
    return (
      <div className="button-list">
        <div className="link-button button">My Sessions</div>
        <div className="link-button button">My Sessions</div>
        <div className="clear-button button">New Poll Session</div>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowLogin: () => (dispatch(showLogin())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
