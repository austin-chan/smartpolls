import React, { Component, PropTypes } from 'react';
import '../styles/_VotingPage.scss';

export default class VotingPage extends Component {
  componentWillMount() {
    console.log('hi');
  }

  renderButtonForOption(option) {
    const label = ['A', 'B', 'C', 'D', 'E'][option];

    return (
      <div className="candidate active" key={option}>
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
        <header>
          <div className="logo">
            <div className="logo-box" />
            <div className="logo-text-container">
              <div className="logo-text">
                <div className="logo-text-inner">Smartpolls</div>
              </div>
            </div>
          </div>
        </header>
        <div className="main">
          <div className="annoucement">
            Professor Lo's Polls
            <div className="annoucement-subtext">
              Locked
            </div>
          </div>
        </div>
        {buttonNodes}
      </div>
    );
  }
}
