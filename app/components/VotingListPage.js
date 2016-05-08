import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import baseRef from '../firebase';
import pluralize from 'pluralize';
import '../styles/_VotingListPage.scss';

class VotingListPage extends Component {
  componentWillMount() {
    baseRef.child(`poll/${this.props.pin}`).once('value', (data) => {
      const polls = data.val();
      this.setState(polls);
    });
  }

  onPollClick(pollId) {
    return () => {
      this.props.dispatch(push('/v/' + pollId));
    };
  }

  renderPolls() {
    let polls = this.state;
    if (!polls) polls = {};

    const pollList = [];
    Object.keys(polls).reverse().forEach((pollId) => {
      const poll = polls[pollId];

      pollList.push(
        <div className="poll-item" key={pollId}>
          <h5 className="poll-name" onClick={this.onPollClick(pollId)}>{poll.title}</h5>
          <p className="poll-info">
            {poll.voteCount} {pluralize('response', poll.voteCount)} ·&nbsp;
            {poll.voterCount} {pluralize('voter', poll.voterCount)}
          </p>
        </div>
      );
    });

    return pollList;
  }

  render() {
    return (
      <div id="PollListPage">
        <div className="container">
          <div className="hero-card card clearfix">
            <h3>Lectures</h3>
            <div className="poll-list">
              {this.renderPolls()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pin: ownProps.params.pin,
  };
}

export default connect(mapStateToProps)(VotingListPage);
