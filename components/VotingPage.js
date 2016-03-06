import React, { Component, PropTypes } from 'react';
import '../styles/_VotingPage.scss';

export default class VotingPage extends Component {
  render() {
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

        <div className="candidate active">
          <div className="candidate-name">A</div>
          <div className="candidate-progress-bar"></div>
          <div className="condidate-votes-container">
            <div className="candidate-votes">1 vote</div>
          </div>
        </div>

        <div className="candidate">
          <div className="candidate-name">B</div>
          <div className="candidate-progress-bar"></div>
          <div className="condidate-votes-container">
            <div className="candidate-votes">5 votes</div>
          </div>
        </div>

        <div className="candidate">
          <div className="candidate-name">C</div>
          <div className="condidate-votes-container">
            <div className="candidate-votes">0 votes</div>
          </div>
        </div>

        <div className="candidate">
          <div className="candidate-name">D</div>
          <div className="condidate-votes-container">
            <div className="candidate-votes">0 votes</div>
          </div>
        </div>

        <div className="candidate">
          <div className="candidate-name">E</div>
          <div className="condidate-votes-container">
            <div className="candidate-votes">0 votes</div>
          </div>
        </div>
      </div>
    );
  }
}
