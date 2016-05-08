import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import Collapse from 'react-collapse';
import baseRef from '../firebase.js';
import { presets } from 'react-motion';
import Poll from './Poll';
import { newQuestion } from '../actions/userActions';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  static propTypes = {
    pollId: PropTypes.string,
    pin: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.trackback = {};
    this.onActivateNewQuestion = this.onActivateNewQuestion.bind(this);
    this.state = { poll: {}, questions: {} };
  }

  // TODO: make more consistent
  componentWillMount() {
    if (this.props.pin) {
      const obj = {};
      obj[0] = baseRef.child(`question/${this.props.pollId}`).on('value', (data) => {
        if (data.exists()) {
          this.setState({ questions: data.val() });
        } else {
          this.setState({ questions: {} });
        }
      });

      obj[1] = baseRef.child(`poll/${this.props.pin}/${this.props.pollId}`).on('value', (data) => {
        const poll = data.val();

        this.setState({ poll });
      });

      this.trackback[this.props.pollId] = obj;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pin !== nextProps.pin || this.props.pollId !== nextProps.pollId) {
      this.componentWillUnmount();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pin !== prevProps.pin || this.props.pollId !== prevProps.pollId) {
      this.componentWillMount();
    }
  }

  componentWillUnmount() {
    const obj = this.trackback[this.props.pollId];
    if (obj) {
      baseRef.child(`question/${this.props.pollId}`).off('value', obj[0]);
      baseRef.child(`poll/${this.props.pin}/${this.props.pollId}`).off('value', obj[1]);
    }
  }

  onActivateNewQuestion() {
    const val = findDOMNode(this.refs.select).value;
    this.props.dispatch(newQuestion(this.props.pollId, val));
  }

  renderQuestions() {
    const questions = this.state.questions;
    const questionList = [];

    Object.keys(questions).forEach((questionId, index) => {
      const question = questions[questionId];

      questionList.push(
        <div className="poll-card card" key={questionId}>
          <div className="top-bar">
            <h2 className="title">Question #{index + 1}</h2>
          </div>
          <Poll options={question.options} results={question.results} />
        </div>
      );
    });

    return questionList;
  }

  render() {
    const poll = this.state.poll;

    return (
      <div id="SessionPage">
        <div className="container">
          <div className="session-info-card card">
            <div className="left-side side">
              <span className="vertical-aligner"></span>
              <div className="wrap">
                <h5>{poll.title}</h5>
                <p className="session-code">Poll PIN code: {this.props.pin}</p>
              </div>
            </div>
            <div className="middle-side side">
              <span className="vertical-aligner"></span>
              <div className="wrap">
                <h5>To join the poll:</h5>
                <div className="steps">
                  <p className="step">1. Navigate to smartpolls.co</p>
                  <p className="step">2. Enter code {this.props.pin}</p>
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
          <Collapse isOpened springConfig={presets.gentle}>
            {this.renderQuestions()}
            <div id="new-poll-card" className="card">
              <div className="top">
                <span>Number of questions</span>
                <select defaultValue="5" ref="select">
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="standard-button large button" onClick={this.onActivateNewQuestion}>
                Add New Question
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pin: state.user.pin,
    pollId: ownProps.params.pollId,
  };
}

export default connect(mapStateToProps)(SessionPage);
