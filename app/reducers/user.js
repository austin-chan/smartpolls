import baseRef from '../firebase.js';
import { SHOW_LOGIN, HIDE_LOGIN } from '../actions/userActions';

const initialState = {
  isUser: baseRef.getAuth() !== null,
  showLogin: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN: {
      return Object.assign({}, state, {
        showLogin: true,
      });
    }
    case HIDE_LOGIN: {
      return Object.assign({}, state, {
        showLogin: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default user;
