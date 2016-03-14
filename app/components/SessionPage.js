import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Poll from './Poll';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    polls: PropTypes.object.isRequired,
    awaitingPayload: PropTypes.bool.isRequired,
  };

  componentWillMount() {
  }

  renderLoading() {
    return (
      <div>
        Loading
      </div>
    );
  }

  renderNotFound() {
    return (
      <div>
        Not Found
      </div>
    );
  }

  render() {
    // render loading page
    if (this.props.awaitingPayload) return this.renderLoading();

    // render no found poll page
    if (!this.isPollValid()) return this.renderNotFound();

    const poll = this.getPoll();
    const pollKey = poll.pollKey;

    return (
      <div id="SessionPage">
        <div className="session-info-card card container">
          <div className="left-side side">
            <span className="vertical-aligner"></span>
            <div className="wrap">
              <h5>Poll Session Code</h5>
              <p className="session-code">{pollKey}</p>
              <div className="button standard-button">Change Session Code</div>
            </div>
          </div>
          <div className="middle-side side">
            <span className="vertical-aligner"></span>
            <div className="wrap">
              <h5>To join the polling session:</h5>
              <div className="steps">
                <p className="step">1. Navigate to smartpolls.co</p>
                <p className="step">2. Enter code {pollKey}</p>
              </div>
            </div>
          </div>
          <div className="right-side side">
            <div className="wrap">
              <span className="vertical-aligner"></span>
              <div className="counters">
                <div className="votes">
                  <span className="count">8</span>
                  <span className="label">votes</span>
                </div>
                <div className="voters">
                  <span className="count">5</span>
                  <span className="label">voters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="poll-card card container">
          <div className="top-bar">
            <h2 className="title">Poll #1</h2>
            <span className="status">Active</span>
            <div className="standard-button button lock-button">Lock & Show Results</div>
          </div>
          <Poll />
        </div>
        <div id="new-poll-card" className="card container">
          <div className="standard-button large button">Activate New Poll</div>
        </div>
      </div>
    );
  }

  getPoll() {
    return this.props.polls[this.props.params.pollId];
  }

  isPollValid() {
    return !!this.getPoll();
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.poll.polls,
    awaitingPayload: state.poll.awaitingPayload,
  };
};

export default connect(mapStateToProps)(SessionPage);
