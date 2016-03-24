import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import { startTracking, stopTracking, makeVote } from '../actions/voteActions';
import '../styles/_VotingPage.scss';

class VotingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pollId: PropTypes.string.isRequired,
    notFound: PropTypes.bool.isRequired,
    questions: PropTypes.object.isRequired,
    votes: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onMakeVote = this.onMakeVote.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(startTracking(this.props.pollId));
  }

  componentWillUnmount() {
    this.props.dispatch(stopTracking(this.props.pollId));
  }

  onMakeVote(vote) {
    return () => {
      const { pollId } = this.props;
      this.props.dispatch(makeVote(pollId, this.getQuestionId(), vote));
    };
  }

  getQuestionId() {
    const keys = Object.keys(this.props.questions);
    return keys[keys.length - 1];
  }

  getTotalVotes() {
    const { aCount, bCount, cCount, dCount, eCount } = this.props.questions[this.getQuestionId()];
    return aCount + bCount + cCount + dCount + eCount;
  }

  getNumVotes(letter) {
    return this.props.questions[this.getQuestionId()][`${letter.toLowerCase()}Count`];
  }

  getVotePercentage(letter) {
    const votes = this.getNumVotes(letter);
    const total = this.getTotalVotes();

    if (!total) return 0;
    return Math.round((votes / total).toFixed(2) * 100);
  }

  hasVoted() {
    const { pollId } = this.props;
    const questionId = this.getQuestionId();
    return this.props.votes[pollId] && this.props.votes[pollId][questionId];
  }

  renderNotFound() {
    return (
      <div>Not Found</div>
    );
  }

  renderLoading() {
    return (
      <div>
      </div>
    );
  }

  renderButtonForLetter(letter) {
    const { votes, pollId } = this.props;
    const questionId = this.getQuestionId();
    const question = this.props.questions[questionId];
    const numVotes = this.getNumVotes(letter);
    const percentage = this.getVotePercentage(letter);
    let buttonClass = 'candidate';
    let pollResults;

    // only check if the user has voted already
    if (this.hasVoted()) {
      const vote = votes[pollId][questionId];
      if (letter === vote) buttonClass += ' active';
    }

    if (question.locked) {
      pollResults = (
        <div className="poll-results">
          <div className="candidate-progress-bar" style={{ width: `${percentage}%` }}></div>
          <div className="condidate-votes-container">
            <span className="vertical-aligner"></span>
            <div className="candidate-votes">{numVotes} {pluralize('vote', numVotes)}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={buttonClass} key={letter} onClick={this.onMakeVote(letter)}>
        <span className="vertical-aligner"></span>
        <div className="candidate-name">{letter.toUpperCase()}</div>
        {pollResults}
      </div>
    );
  }

  render() {
    // poll not found
    if (this.props.notFound) return this.renderNotFound();
    // data still loading
    if (!Object.keys(this.props.questions).length) return this.renderLoading();

    const lockedLabel = this.props.questions[this.getQuestionId()].locked ?
      'Voting For This Question Has Ended' : 'Poll Is Accepting Votes For This Question';

    return (
      <div id="VotingPage">
        <div className="main-container">
          <div className="main card">
            <div className="annoucement">
              Professor Lo's Poll
              <p className="annoucement-subtext">{lockedLabel}</p>
            </div>
          </div>
        </div>
        {this.renderButtonForLetter('a')}
        {this.renderButtonForLetter('b')}
        {this.renderButtonForLetter('c')}
        {this.renderButtonForLetter('d')}
        {this.renderButtonForLetter('e')}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pollId: ownProps.params.pollId,
    notFound: state.vote.notFound,
    questions: state.vote.questions,
    votes: state.vote.votes,
  };
}

export default connect(mapStateToProps)(VotingPage);
