import React, { Component, PropTypes } from 'react';
import '../styles/_VotingPage.scss';

export default class VotingPage extends Component {
  componentWillMount() {
  }

  renderButtonForOption(option) {
    const label = ['A', 'B', 'C', 'D', 'E'][option];

    return (
      <div className="candidate" key={option}>
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
    const buttonNodes = [];

    for (let b = 0; b < 5; b++) {
      buttonNodes.push(this.renderButtonForOption(b));
    }

    return (
      <div id="VotingPage">
        <div className="main-container">
          <div className="main card">
            <div className="annoucement">
              Professor Lo's Polls
              <p className="annoucement-subtext">Locked</p>
            </div>
          </div>
        </div>
        {buttonNodes}
      </div>
    );
  }
}
