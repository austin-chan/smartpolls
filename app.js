import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';


const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
});

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <div>
        Test
      </div>
    </Route>
  </Router>
), document.getElementById('application-root'));
