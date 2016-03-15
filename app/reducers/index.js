import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import poll from './poll';
import vote from './vote';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  poll,
  vote,
});

export default rootReducer;
