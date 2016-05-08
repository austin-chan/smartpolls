import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import baseRef from '../firebase.js';
import { serverAgo } from '../util.js';
import '../styles/_PollListPage.scss';

class PollListPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pin: PropTypes.string,
  };

  constructor() {
    super();
    this.state = { polls: {} };
    this.onPollClick = this.onPollClick.bind(this);
    this.trackback = null;
  }

  // start downloading the list
  componentWillMount() {
    if (this.props.pin) {
      this.trackback = baseRef.child(`poll/${this.props.pin}`).on('value', (data) => {
        const polls = data.val();
        this.setState({ polls });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pin !== prevProps.pin) {
      this.componentWillMount();
    }
  }

  componentWillUnmount() {
    baseRef.child(`poll/${this.props.pin}`).off('value', this.trackback);
  }

  onPollClick(pollId) {
    return () => {
      this.props.dispatch(push(`/s/${pollId}`));
    };
  }

  renderPolls() {
    const pollList = [];

    Object.keys(this.state.polls).reverse().forEach((pollId) => {
      const poll = this.state.polls[pollId];

      pollList.push(
        <div className="poll-item" key={pollId}>
          <h5 className="poll-name" onClick={this.onPollClick(pollId)}>{poll.title}</h5>
          <p className="poll-info">
            {serverAgo(poll.createdAt)} ·&nbsp;
            {poll.voterCount} {pluralize('voters', poll.voterCount)} ·&nbsp;
            {poll.voteCount} {pluralize('votes', poll.voteCount)}
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
    pin: state.user.pin,
  };
}

export default connect(mapStateToProps)(PollListPage);
