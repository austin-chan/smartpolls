import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(browserHistory) {
  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)),
      // enable Redux Chrome DevTools
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  // enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
