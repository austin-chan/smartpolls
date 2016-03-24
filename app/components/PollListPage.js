import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import '../styles/_PollListPage.scss';

class PollListPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    polls: PropTypes.object.isRequired,
    awaitingInitialLoad: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.onPollClick = this.onPollClick.bind(this);
  }

  onPollClick(pollId) {
    return () => {
      this.props.dispatch(push(`/s/${pollId}`));
    };
  }

  renderPolls() {
    const pollList = [];
    const { polls } = this.props;

    Object.keys(polls).reverse().forEach((pollId) => {
      const poll = polls[pollId];
      const questionCount = Object.keys(poll.questionRefs).length;

      pollList.push(
        <div className="poll-item" key={pollId}>
          <h5 className="poll-name" onClick={this.onPollClick(pollId)}>{poll.pollKey}</h5>
          <p className="poll-info">
            Created a week ago ·&nbsp;
            {poll.voterCount} {pluralize('voters', poll.voterCount)} ·&nbsp;
            {poll.voteCount} {pluralize('votes', poll.voteCount)} ·&nbsp;
            {questionCount} {pluralize('question', questionCount)}
          </p>
        </div>
      );
    });

    return pollList;
  }

  renderLoading() {
    return (
      <div>
      </div>
    );
  }

  render() {
    if (this.props.awaitingInitialLoad) return this.renderLoading();

    return (
      <div id="PollListPage">
        <div className="container">
          <div className="hero-card card clearfix">
            <h3>My Polls</h3>
            <div className="poll-list">
              {this.renderPolls()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.poll.polls,
    awaitingInitialLoad: state.poll.awaitingInitialLoad,
  };
}

export default connect(mapStateToProps)(PollListPage);
