import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from './components/App';
import VotingPage from './components/VotingPage';
import SessionPage from './components/SessionPage';
import HomePage from './components/HomePage';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="v/:pollId" component={VotingPage} />
      <Route path="s/:pollId" component={SessionPage} />
    </Route>
  </Router>
), document.getElementById('application-root'));
