import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';
import '../styles/_SessionPage.scss';

export default class SessionPage extends Component {
  componentWillMount() {
    console.log('hi');
  }

  render() {
    return (
      <div id="SessionPage">
        <Navigation />
        HEEY
      </div>
    );
  }
}
