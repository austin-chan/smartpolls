import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from './components/App';
import VotingPage from './components/VotingPage';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={VotingPage} />
    </Route>
  </Router>
), document.getElementById('application-root'));
