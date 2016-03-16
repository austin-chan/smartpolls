import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Poll from './Poll';
import { attemptChangePollKey, startTracking } from '../actions/pollActions';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  static propTypes = {
    pollId: PropTypes.string,
    polls: PropTypes.object.isRequired,
    awaitingPayload: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(startTracking(this.props.pollId));
  }

  onChangePollKey() {
    this.props.dispatch(attemptChangePollKey(this.props.pollId));
  }

  getPoll() {
    return this.props.polls[this.props.pollId];
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

  renderQuestions() {
    return (
      <div className="poll-card card">
        <div className="top-bar">
          <h2 className="title">Question #1</h2>
          <span className="status">Active</span>
          <div className="standard-button button lock-button">Lock & Show Results</div>
        </div>
        <Poll />
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
        <div className="container">
          <div className="session-info-card card">
            <div className="left-side side">
              <span className="vertical-aligner"></span>
              <div className="wrap">
                <h5>Poll Code</h5>
                <p className="session-code">{pollKey}</p>
                <div className="button standard-button" onClick={this.onChangePollKey.bind(this)}>Change Poll Code</div>
              </div>
            </div>
            <div className="middle-side side">
              <span className="vertical-aligner"></span>
              <div className="wrap">
                <h5>To join the poll:</h5>
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
          {this.renderQuestions()}
          <div id="new-poll-card" className="card">
            <div className="standard-button large button">Activate New Question</div>
          </div>
        </div>
      </div>
    );
  }

  isPollValid() {
    return !!this.getPoll();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pollId: ownProps.params.pollId,
    polls: state.poll.polls,
    awaitingPayload: state.poll.awaitingPayload,
  };
}

export default connect(mapStateToProps)(SessionPage);
