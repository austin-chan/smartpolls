import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import Poll from './Poll';
import { changePollKey, startTracking, stopTracking, lockQuestion,
  newQuestion } from '../actions/pollActions';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  static propTypes = {
    pollId: PropTypes.string,
    polls: PropTypes.object.isRequired,
    awaitingInitialLoad: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onActivateNewQuestion = this.onActivateNewQuestion.bind(this);
    this.onChangePollKey = this.onChangePollKey.bind(this);
    this.onLockQuestion = this.onLockQuestion.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(startTracking(this.props.pollId));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pollId !== nextProps.pollId) {
      this.componentWillUnmount();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pollId !== prevProps.pollId) {
      this.componentWillMount();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(stopTracking(this.props.pollId));
  }

  onChangePollKey() {
    this.props.dispatch(changePollKey(this.props.pollId));
  }

  onActivateNewQuestion() {
    const lastQuestionId = Object.keys(this.getPoll().questions).slice(-1)[0];
    this.props.dispatch(lockQuestion(lastQuestionId));
    this.props.dispatch(newQuestion(this.props.pollId));
  }

  onLockQuestion(questionId) {
    return () => {
      this.props.dispatch(lockQuestion(questionId));
    };
  }

  getPoll() {
    return this.props.polls[this.props.pollId];
  }

  isLoading() {
    return this.props.awaitingInitialLoad || !this.getPoll().isPollLoaded ||
      !this.getPoll().isQuestionsLoaded;
  }

  isPollValid() {
    return !!this.getPoll();
  }

  renderLoading() {
    return (
      <div>
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
    const questions = this.getPoll().questions;
    const questionList = [];

    Object.keys(questions).forEach((questionId, index) => {
      const question = questions[questionId];
      const { aCount, bCount, cCount, dCount, eCount } = question;
      let lockedLabel = 'Closed For Voting';
      let lockButton;

      if (!question.locked) {
        lockedLabel = 'Open For Voting';
        lockButton = (
          <div className="standard-button button lock-button"
            onClick={this.onLockQuestion(questionId)}
          >
            Close Voting & Reveal Results To Voters
          </div>
        );
      }

      questionList.push(
        <div className="poll-card card" key={questionId}>
          <div className="top-bar">
            <h2 className="title">Question #{index + 1}</h2>
            <span className="status">{lockedLabel}</span>
            {lockButton}
          </div>
          <Poll aCount={aCount} bCount={bCount} cCount={cCount} dCount={dCount} eCount={eCount} />
        </div>
      );
    });

    return questionList;
  }

  render() {
    // render loading page
    if (this.isLoading()) return this.renderLoading();

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
                <div className="button standard-button" onClick={this.onChangePollKey}>
                  Change Poll Code
                </div>
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
                    <span className="count">{poll.voteCount}</span>
                    <span className="label">{pluralize('vote', poll.voteCount)}</span>
                  </div>
                  <div className="voters">
                    <span className="count">{poll.voterCount}</span>
                    <span className="label">{pluralize('voter', poll.voterCount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.renderQuestions()}
          <div id="new-poll-card" className="card">
            <div className="standard-button large button" onClick={this.onActivateNewQuestion}>
              Activate New Question
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pollId: ownProps.params.pollId,
    polls: state.poll.polls,
    awaitingInitialLoad: state.poll.awaitingInitialLoad,
  };
}

export default connect(mapStateToProps)(SessionPage);
