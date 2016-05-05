import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { presets } from 'react-motion';
import Collapse from 'react-collapse';
import { showSignup } from '../actions/userActions';
import { newPoll } from '../actions/pollActions';
import { attemptJoinVote } from '../actions/voteActions';
import Poll from './Poll';
import '../styles/_HomePage.scss';

class VotingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isUser: PropTypes.bool.isRequired,
    errorPollKey: PropTypes.string,
  };

  constructor() {
    super();
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onNewPoll = this.onNewPoll.bind(this);
    this.onVoteJoin = this.onVoteJoin.bind(this);
    this.onVoteKeyPress = this.onVoteKeyPress.bind(this);
  }

  componentWillMount() {
    // workaround for weird Collapse component bug
    this.props.dispatch(attemptJoinVote(this.props.errorPollKey === '' ? null : ''));
  }

  componentWillUnmount() {
    // workaround for weird Collapse component bug
    this.props.dispatch(attemptJoinVote(null));
  }

  onSignupClick() {
    this.props.dispatch(showSignup());
  }

  onNewPoll() {
    this.props.dispatch(newPoll());
  }

  onVoteJoin() {
    const pollKey = findDOMNode(this.refs.joinInput).value;
    this.props.dispatch(attemptJoinVote(pollKey));
  }

  onVoteKeyPress(e) {
    // enter key press
    if (e.which === 13) {
      this.onVoteJoin();
    }
  }

  // render new poll button for users, signup button for guests
  renderActionButton() {
    return this.props.isUser ?
      <div className="standard-button button large signup-button" onClick={this.onNewPoll}>
        Create a New Poll</div> :
      <div className="standard-button button large signup-button" onClick={this.onSignupClick}>
        Signup for Smartpolls</div>;
  }

  renderJoinError() {
    return !this.props.errorPollKey ? null : (
      <div className="not-found">
        <h4>No Poll Found:&nbsp;</h4>
        <span>{this.props.errorPollKey}</span>
      </div>
    );
  }

  render() {
    return (
      <div id="HomePage">
        <div className="container">
          <div className="hero-card card clearfix">
            <div className="left-side">
              <p className="tagline">
                Create <strong>Fast</strong> and <strong>Simple Live Polls</strong>&nbsp;
                with <strong>Smartpolls</strong>
              </p>
              <p className="second-tagline">
                No Frills, Just Thrills.<br />All for Free.
              </p>
              {this.renderActionButton()}
            </div>
            <div className="right-side">
              <Poll aCount={274} bCount={98} cCount={0} dCount={3} eCount={0} hideTotal />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="join-card card">
            <Collapse isOpened springConfig={presets.gentle}>
              <h5 className="card-header">Join a Poll</h5>
              <div className="input-group">
                <input type="text" className="standard-input session-code-input" ref="joinInput"
                  placeholder="Enter Poll Session Code" onKeyPress={this.onVoteKeyPress}
                />
                <div className="standard-button button large join-button" onClick={this.onVoteJoin}>
                  Join
                </div>
              </div>
              {this.renderJoinError()}
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUser: state.user.isUser,
    errorPollKey: state.vote.errorPollKey,
  };
}

export default connect(mapStateToProps)(VotingPage);
