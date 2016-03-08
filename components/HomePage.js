import React, { Component, PropTypes } from 'react';
import Poll from './Poll';
import '../styles/_HomePage.scss';

export default class VotingPage extends Component {
  componentWillMount() {
  }

  render() {

    return (
      <div id="HomePage">
        <div className="hero-card card container clearfix">
          <div className="left-side">
            <p className="tagline">
              Create <strong>Fast</strong> and <strong>Simple Live Polls</strong> with <strong>Smartpolls</strong>
            </p>
            <p className="second-tagline">
              No Frills, Just Thrills.<br/>All for Free.
            </p>
            <div className="standard-button button large signup-button">Signup for Smartpolls</div>
          </div>
          <div className="right-side">
            <Poll />
          </div>
        </div>
        <div className="join-card card container">
          <h5 className="card-header">Join a Poll</h5>
          <div className="input-group">
            <input type="text" className="standard-input session-code-input" placeholder="Enter Poll Session Code"/>
            <div className="standard-button button large join-button">Join</div>
          </div>
          <div className="not-found">
            <h4>No Poll Found:&nbsp;</h4>
            <span>icy-water</span>
          </div>
        </div>
      </div>
    );
  }
}
