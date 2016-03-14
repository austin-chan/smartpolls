import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import poll from './poll';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  poll,
});

export default rootReducer;
