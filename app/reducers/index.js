import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import vote from './vote';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  vote,
});

export default rootReducer;
