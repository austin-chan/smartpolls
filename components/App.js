import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation';
import Login from './Login';
import '../styles/_App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div id="App">
        <Navigation />
        <div className="page-content">
          {this.props.children}
        </div>
        <footer>Copyright © 2016 SmartPolls. All rights reserved.</footer>
        <Login />
      </div>
    );
  }
}
