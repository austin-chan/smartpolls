import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';
import VotingPage from './VotingPage';
import SessionPage from './SessionPage';
import HomePage from './HomePage';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="v/:pollId" component={VotingPage} />
            <Route path="s/:pollId" component={SessionPage} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
