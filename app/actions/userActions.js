import { push } from 'react-router-redux';
import { resetPolls } from './pollActions';
import baseRef from '../firebase';

// action type constants
export const SHOW_LOGIN = 'SHOW_LOGIN';
export const SHOW_SIGNUP = 'SHOW_SIGNUP';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const HIDE_LOGIN = 'HIDE_LOGIN';
export const ATTEMPT_LOGIN_SIGNUP = 'ATTEMPT_LOGIN_SIGNUP';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

let trackCallback = null;

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data: {
      name: data.name,
    },
  };
}

export function changeName(name) {
  return (dispatch, getState) => {
    const uid = getState().user.uid;
    baseRef.child(`users/${uid}`).update({
      name,
    });
  };
}

export function changePassword(oldP, newP, callback) {
  return () => {
    baseRef.changePassword({
      email: baseRef.getAuth().password.email,
      oldPassword: oldP,
      newPassword: newP,
    }, (error) => {
      if (error) {
        callback(String(error));
      } else {
        callback('Success');
      }
    });
  };
}

export function startTracking() {
  return (dispatch, getState) => {
    const user = getState().user;

    if (user.uid) {
      trackCallback = baseRef.child(`users/${user.uid}`).on('value', (data) => {
        const snapshot = data.val();

        dispatch(receiveData(snapshot));
      });
    }
  };
}

export function stopTracking() {
  return (dispatch, getState) => {
    const user = getState().user;

    if (trackCallback) {
      baseRef.child(`users/${user.uid}`).off('value', trackCallback);
    }
  };
}

export function showLogin() {
  return {
    type: SHOW_LOGIN,
  };
}

export function showSignup() {
  return {
    type: SHOW_SIGNUP,
  };
}

export function hideLogin() {
  return {
    type: HIDE_LOGIN,
  };
}

export function logout() {
  return (dispatch) => {
    baseRef.unauth();
    dispatch(push('/'));
    dispatch(stopTracking());
    dispatch({ type: LOGOUT });
  };
}

export function login({ uid }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      uid,
    });
    dispatch(resetPolls());
    dispatch(startTracking());
    dispatch(push('/my-polls'));
  };
}

// error types: https://www.firebase.com/docs/web/guide/user-auth.html
function receiveError(error) {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_ERROR,
      error,
    });
  };
}

export function attemptLogin(email, password) {
  return (dispatch, getState) => {
    // prevent double request
    if (getState().user.awaitingAuthResponse) return;

    dispatch({ type: ATTEMPT_LOGIN_SIGNUP });
    baseRef.authWithPassword({
      email,
      password,
    }, (error, authData) => {
      if (error) {
        dispatch(receiveError(error.code));
      } else {
        dispatch(login(authData));
      }
    });
  };
}

/**
 * Attempt a signup and either handle the error response or log the user in.
 *
 * @param {String} email
 * @param {String} password
 * @param {String} name
 */
export function attemptSignup(email, password, name) {
  return (dispatch, getState) => {
    // prevent double request
    if (getState().user.awaitingAuthResponse) return;

    // handle empty name error
    if (!name) {
      dispatch(receiveError('INVALID_NAME', true));
      return;
    }

    dispatch({ type: ATTEMPT_LOGIN_SIGNUP });
    baseRef.createUser({
      email,
      password,
    }, (error, authData) => {
      if (error) {
        dispatch(receiveError(error.code));
      } else {
        // log the user in
        baseRef.authWithPassword({
          email,
          password,
        }, () => {
          // update the name of the user
          const usersRef = baseRef.child('users');
          usersRef.update({
            [authData.uid]: {
              name,
            },
          });

          // update the store with the user info
          dispatch(login(authData));
        });
      }
    });
  };
}

