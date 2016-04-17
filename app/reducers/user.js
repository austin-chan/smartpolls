import baseRef from '../firebase.js';
import {
  SHOW_LOGIN,
  SHOW_SIGNUP,
  HIDE_LOGIN,
  RECEIVE_DATA,
  ATTEMPT_LOGIN_SIGNUP,
  RECEIVE_ERROR,
  LOGOUT,
  LOGIN,
} from '../actions/userActions';

const initialState = {
  isUser: baseRef.getAuth() !== null,
  isSignup: false,
  showModal: false,
  error: null,
  uid: baseRef.getAuth() !== null ? baseRef.getAuth().uid : null,
  name: null,
  awaitingAuthResponse: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN: {
      return Object.assign({}, state, {
        showModal: true,
        isSignup: false,
        error: null,
      });
    }
    case RECEIVE_DATA: {
      return Object.assign({}, state, action.data);
    }
    case SHOW_SIGNUP: {
      return Object.assign({}, state, {
        showModal: true,
        isSignup: true,
        error: null,
      });
    }
    case HIDE_LOGIN: {
      return Object.assign({}, state, {
        showModal: false,
      });
    }
    case ATTEMPT_LOGIN_SIGNUP: {
      return Object.assign({}, state, {
        awaitingAuthResponse: true,
      });
    }
    case RECEIVE_ERROR: {
      return Object.assign({}, state, {
        awaitingAuthResponse: false,
        error: action.error,
      });
    }
    case LOGIN: {
      return Object.assign({}, state, {
        awaitingAuthResponse: false,
        showModal: false,
        isUser: true,
        uid: action.uid,
      });
    }
    case LOGOUT: {
      return Object.assign({}, state, {
        isUser: false,
        uid: null,
      });
    }
    default: {
      return state;
    }
  }
};

export default user;
