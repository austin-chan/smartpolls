import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import cookie from 'react-cookie';
// import { startTracking, stopTracking, makeVote } from '../actions/voteActions';
import baseRef from '../firebase';
import '../styles/_VotingPage.scss';

class VotingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pollId: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    votes: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {};
    this.onMakeVote = this.onMakeVote.bind(this);
  }

  componentWillMount() {
    this.track = baseRef.child(`question/${this.props.pollId}`).on('value', (data) => {
      const snapshot = data.val();
      if (snapshot) {
        this.setState(snapshot);
      } else {
        this.setState({});
      }
    });
  }

  componentWillUnmount() {
    baseRef.child(`question/${this.props.pollId}`).off('value', this.track);
  }

  onMakeVote(qid, vote) {
    return () => {
      const question = this.state[qid];
      const old = cookie.load(qid);
      let results = question.results;
      const options = question.options;
      const newIndex = Math.floor(options.indexOf(vote) / 2);
      const oldIndex = Math.floor(options.indexOf(old) / 2);
      results = results.split('-');
      results[newIndex] = Number(results[newIndex]) + 1;
      let voteCountDiff = 1;
      if (old) {
        voteCountDiff -= 1;
        results[oldIndex] = Number(results[oldIndex]) - 1;
      }

      results = results.join('-');

      cookie.save(qid, vote);
      baseRef.child(`question/${this.props.pollId}/${qid}`).update({
        results,
      });

      // baseRef.child(`poll/${this.props.pollId}`)

      this.forceUpdate();
    };
  }

  getTotalVotes(results) {
    return results.reduce((sum, a) => (Number(sum) + Number(a)));
  }

  getPercentage(votes, total) {
    if (!total) return 0;
    return Math.round((votes / total).toFixed(2) * 100);
  }

  optionIsSelected(qid, option) {
    const data = cookie.load(qid);
    return data === option;
  }

  hasVoted() {
    const { pollId } = this.props;
    const questionId = this.getQuestionId();
    return this.props.votes[pollId] && this.props.votes[pollId][questionId];
  }

  renderButtonForLetter(qid, option, numVotes, total) {
    let buttonClass = 'candidate';
    const percentage = this.getPercentage(numVotes, total);

    // only check if the user has voted already
    if (this.optionIsSelected(qid, option)) {
      buttonClass += ' active';
    }

    return (
      <div className={buttonClass} key={qid + option} onClick={this.onMakeVote(qid, option)}>
        <span className="vertical-aligner"></span>
        <div className="candidate-name">{option.toUpperCase()}</div>
        <div className="poll-results">
          <div className="candidate-progress-bar" style={{ width: `${percentage}%` }}></div>
          <div className="condidate-votes-container">
            <span className="vertical-aligner"></span>
            <div className="candidate-votes">{numVotes} {pluralize('vote', numVotes)}</div>
          </div>
        </div>
      </div>
    );
  }

  renderQuestions() {
    const list = [];

    if (!Object.keys(this.state).length) {
      return (
        <h2 className="title">No Questions</h2>
      );
    }

    Object.keys(this.state).forEach((questionId) => {
      const question = this.state[questionId];
      console.log(question);
      const results = question.results.split('-');
      const total = this.getTotalVotes(results);
      const optionList = [];
      question.options.split('-').forEach((option, i) => {
        const optionCount = results[i];
        optionList.push(
          this.renderButtonForLetter(questionId, option, optionCount, total)
        );
      });
      list.push(
        <div className="question" key={questionId}>
          <h2 className="title">{question.title}</h2>
          {optionList}
        </div>
      );
    });

    return list;
  }

  render() {
    return (
      <div id="VotingPage">
        <div className="main-container">
          {/*<div className="container">
            <div className="main card">
              <div className="annoucement">
                's Poll
                <p className="annoucement-subtext"></p>
              </div>
            </div>
          </div>*/}
        </div>
        <div className="container">
          {this.renderQuestions()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pollId: ownProps.params.pollId,
    questions: state.vote.questions,
    votes: state.vote.votes,
  };
}

export default connect(mapStateToProps)(VotingPage);
