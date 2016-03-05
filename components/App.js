import React, { Component, PropTypes } from 'react';
import '../styles/_App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div id="App">
        {this.props.children}
      </div>
    );
  }
}
