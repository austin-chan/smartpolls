import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';
import VotingPage from './VotingPage';
import VotingListPage from './VotingListPage';
import SessionPage from './SessionPage';
import PollListPage from './PollListPage';
import AccountPage from './AccountPage';
import NoMatch from './NoMatch';
import HomePage from './HomePage';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="v/:pollId" component={VotingPage} />
          <Route path="s/:pollId" component={SessionPage} />
          <Route path="l/:pin" component={VotingListPage} />
          <Route path="my-polls" component={PollListPage} />
          <Route path="my-account" component={AccountPage} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    </Provider>
  );
}
