import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
      <div>Loading</div>
    );
  }

  renderButtonForOption(option) {
    const label = ['A', 'B', 'C', 'D', 'E'][option];
    const { votes, pollId } = this.props;
    let rootClass = 'candidate';

    if (this.hasVoted()) {
      const vote = votes[pollId][this.getQuestionId()];
      if (label.toLowerCase() === vote) rootClass += ' active';
    }

    return (
      <div className={rootClass} key={option} onClick={this.onMakeVote(label)}>
        <span className="vertical-aligner"></span>
        <div className="candidate-name">{label}</div>
        <div className="candidate-progress-bar"></div>
        <div className="condidate-votes-container">
          <div className="candidate-votes">1 vote</div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.notFound) return this.renderNotFound();

    if (!Object.keys(this.props.questions).length) return this.renderLoading();

    const buttonNodes = [];

    for (let b = 0; b < 5; b++) {
      buttonNodes.push(this.renderButtonForOption(b));
    }

    return (
      <div id="VotingPage">
        <div className="main-container">
          <div className="main card">
            <div className="annoucement">
              Professor Lo's Poll
              <p className="annoucement-subtext">Locked</p>
            </div>
          </div>
        </div>
        {buttonNodes}
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
