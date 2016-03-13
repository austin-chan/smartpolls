import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/userActions';
import Poll from './Poll';
import '../styles/_HomePage.scss';

class VotingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isUser: PropTypes.bool.isRequired,
  };

  componentWillMount() {
  }

  onSignupClick() {
    this.props.dispatch(showModal());
  }

  onNewPoll() {

  }

  // render new poll button for users, signup button for guests
  renderActionButton() {
    return this.props.isUser ?
      (<div className="standard-button button large signup-button" onClick={this.onNewPoll.bind(this)}>Create a New Poll</div>) :
      (<div className="standard-button button large signup-button" onClick={this.onSignupClick.bind(this)}>Signup for Smartpolls</div>);
  }

  render() {
    return (
      <div id="HomePage">
        <div className="hero-card card container clearfix">
          <div className="left-side">
            <p className="tagline">
              Create <strong>Fast</strong> and <strong>Simple Live Polls</strong> with <strong>Smartpolls</strong>
            </p>
            <p className="second-tagline">
              No Frills, Just Thrills.<br/>All for Free.
            </p>
            {this.renderActionButton()}
          </div>
          <div className="right-side">
            <Poll />
          </div>
        </div>
        <div className="join-card card container">
          <h5 className="card-header">Join a Poll</h5>
          <div className="input-group">
            <input type="text" className="standard-input session-code-input" placeholder="Enter Poll Session Code"/>
            <div className="standard-button button large join-button">Join</div>
          </div>
          <div className="not-found">
            <h4>No Poll Found:&nbsp;</h4>
            <span>icy-water</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUser: state.user.isUser,
  };
};

export default connect(mapStateToProps)(VotingPage);
