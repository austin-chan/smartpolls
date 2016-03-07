import React, { Component, PropTypes } from 'react';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  componentWillMount() {
    console.log('hi');
  }

  render() {
    return (
      <div id="SessionPage">
        <div className="session-info card container">
            <div className="left-side">
                <h5>Poll Session Code</h5>
                <p className="session-code">exotic-moon</p>
            </div>
            <div className="middle-side">

            </div>
            <div className="right-side">

            </div>

        </div>
      </div>
    );
  }
}
