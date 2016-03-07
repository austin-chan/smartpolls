import React, { Component, PropTypes } from 'react';
import Poll from './Poll';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  componentWillMount() {
    console.log('hi');
  }

  render() {
    return (
      <div id="SessionPage">
        <div className="session-info-card card container">
          <div className="left-side side">
            <span className="vertical-aligner"></span>
            <div className="wrap">
              <h5>Poll Session Code</h5>
              <p className="session-code">exotic-moon</p>
              <div className="button standard-button">Change Session Code</div>
            </div>
          </div>
          <div className="middle-side side">
            <span className="vertical-aligner"></span>
            <div className="wrap">
              <h5>To join the polling session:</h5>
              <div className="steps">
                <p className="step">1. Navigate to smartpolls.co</p>
                <p className="step">2. Enter code exotic-moon</p>
              </div>
            </div>
          </div>
          <div className="right-side side">
            <div className="wrap">
              <span className="vertical-aligner"></span>
              <div className="counters">
                <div className="votes">
                  <span className="count">8</span>
                  <span className="label">votes</span>
                </div>
                <div className="voters">
                  <span className="count">5</span>
                  <span className="label">voters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="poll-card card container">
          <div className="top-bar">
            <h2 className="title">Poll #1</h2>
            <span className="status">Active</span>
            <div className="standard-button button lock-button">Lock & Show Results</div>
          </div>
          <Poll />
        </div>
      </div>
    );
  }
}
