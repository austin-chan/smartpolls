import { push } from 'react-router-redux';
import baseRef from '../firebase';
import { timestampToServer } from '../util';

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

// let trackCallback = null;

export function newPoll() {
  return (dispatch, getState) => {
    baseRef.child(`poll/${getState().user.pin}`).once('value', (data) => {
      const snapshot = data.val();
      let count;
      if (!snapshot) count = 0;
      else count = Object.keys(snapshot).length;

      const newP = baseRef.child(`poll/${getState().user.pin}`).push({
        locked: false,
        voteCount: 0,
        voterCount: 0,
        title: `Lecture ${count + 1}`,
        createdAt: timestampToServer(),
        updatedAt: timestampToServer(),
      });

      newP.update({ pid: newP.key() });

      dispatch(push(`/s/${newP.key()}`));
    });
  };
}

export function newQuestion(pollId, count) {
  return () => {
    baseRef.child(`question/${pollId}`).once('value', (data) => {
      const snapshot = data.val();
      let c;
      if (!snapshot) c = 0;
      else c = Object.keys(snapshot).length;

      let options = 'a';
      let results = '0';
      for (let n = 1; n < count; n++) {
        results += '-0';
        options += '-' + String.fromCharCode('a'.charCodeAt(0) + n);
      }

      const newQ = baseRef.child(`question/${pollId}`).push({
        locked: false,
        title: `Question #${c + 1}`,
        createdAt: timestampToServer(),
        updatedAt: timestampToServer(),
        results,
        options,
      });

      newQ.update({ qid: newQ.key() });
    });
  };
}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data: {
      pin: data.pin,
    },
  };
}

// export function changeName(name) {
//   return (dispatch, getState) => {
//     const uid = getState().user.uid;
//     baseRef.child(`users/${uid}`).update({
//       name,
//     });
//   };
// }

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

export function resetUser() {
  return (dispatch, getState) => {
    if (getState().user.isUser) {
      baseRef.child(`users/${getState().user.uid}`).on('value', (data) => {
        const snapshot = data.val();

        dispatch(receiveData(snapshot));
      });
    }
  };
}

// export function startTracking() {
//   return (dispatch, getState) => {
//     const user = getState().user;

//     if (user.uid) {
//       trackCallback = baseRef.child(`users/${user.uid}`).on('value', (data) => {
//         const snapshot = data.val();

//         dispatch(receiveData(snapshot));
//       });
//     }
//   };
// }

// export function stopTracking() {
//   return (dispatch, getState) => {
//     const user = getState().user;

//     if (trackCallback) {
//       baseRef.child(`users/${user.uid}`).off('value', trackCallback);
//     }
//   };
// }

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
    // dispatch(stopTracking());
    dispatch({ type: LOGOUT });
  };
}

export function login(uid, pin) {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      uid,
      pin,
    });
    // dispatch(startTracking());
    setTimeout(() => {
      dispatch(push('/my-polls'));
    }, 0);
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
        baseRef.child('users/' + authData.uid).once('value', (data) => {
          dispatch(login(authData, data.val().pin));
        });
      }
    });
  };
}

/**
 * Attempt a signup and either handle the error response or log the user in.
 *
 * @param {String} email
 * @param {String} password
 */
export function attemptSignup(email, password) {
  return (dispatch, getState) => {
    // prevent double request
    if (getState().user.awaitingAuthResponse) return;

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
          // update the PIN of the user
          let pin = '';
          while (pin.length < 4) pin += Math.random().toString(36).substr(2, 1);

          const usersRef = baseRef.child('users');
          usersRef.update({
            [authData.uid]: {
              numPolls: 0,
              pin,
            },
          });

          // update the store with the user info
          dispatch(login(authData.uid, pin));
        });
      }
    });
  };
}

