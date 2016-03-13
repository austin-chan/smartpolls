import baseRef from '../firebase.js';
import { SHOW_MODAL, SHOW_SIGNUP, HIDE_LOGIN, ATTEMPT_LOGIN_SIGNUP, RECEIVE_ERROR, LOGOUT,
  LOGIN } from '../actions/userActions';

const initialState = {
  isUser: baseRef.getAuth() !== null,
  showSignup: false,
  showModal: false,
  error: null,
  awaitingAuthResponse: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return Object.assign({}, state, {
        showModal: true,
        showSignup: false,
        error: null,
      });
    }
    case SHOW_SIGNUP: {
      return Object.assign({}, state, {
        showSignup: true,
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
        showSignup: action.showSignup,
      });
    }
    case LOGIN: {
      return Object.assign({}, state, {
        awaitingAuthResponse: false,
        showModal: false,
        isUser: true,
      });
    }
    case LOGOUT: {
      return Object.assign({}, state, {
        isUser: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default user;
