import React, { Component, PropTypes } from 'react';
import '../styles/_Navigation.scss';

export default class Navigation extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div id="Navigation">
        <div className="container">
          <div className="left-side">
            <div className="logo">
              <span className="vertical-aligner" />
              <img className="logo-image" src="http://placehold.it/100x100" />
              <div className="logo-text">Smartpolls</div>
            </div>
          </div>
          <div className="right-side">
            <span className="vertical-aligner" />
            <div className="link-button button">My Sessions</div>
            <div className="link-button button">My Sessions</div>
            <div className="clear-button button">New Poll Session</div>
          </div>
        </div>
      </div>
    );
  }
}
