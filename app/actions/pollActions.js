import { push } from 'react-router-redux';
import namer from '../namer';
import baseRef from '../firebase';

export const NEW_POLL = 'NEW_POLL';
export const LOCK_POLL = 'LOCK_POLL';
export const RECEIVE_POLL_DATA = 'RECEIVE_POLL_DATA';
export const RECEIVE_QUESTION_DATA = 'RECEIVE_QUESTION_DATA';

const trackCallbacks = {};

function receivePollData(data) {
  const transformedData = {};

  // transform data from Firebase to Redux structure
  Object.keys(data).forEach((key) => {
    const obj = Object.assign({}, data[key]);
    obj.isPollLoaded = true;
    delete obj.questions;
    delete obj.uid;
    transformedData[key] = obj;
  });

  return {
    type: RECEIVE_POLL_DATA,
    data: transformedData,
  };
}

function receiveQuestionData(pollId, data) {
  return {
    type: RECEIVE_QUESTION_DATA,
    pollId,
    data,
  };
}


export function startTracking(pollId) {
  return (dispatch) => {
    const trackObj = {};
    const pollRef = baseRef.child(`polls/${pollId}`);
    trackObj.poll = pollRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(receivePollData({
          [pollId]: snapshot.val(),
        }));
      }
    }, this);

    const questionsRef = baseRef.child('questions');
    trackObj.questions = questionsRef.orderByChild('pollId').equalTo(pollId).on('value',
      (snapshot) => {
        if (snapshot.exists()) dispatch(receiveQuestionData(pollId, snapshot.val()));
      }, this);

    trackCallbacks[pollId] = trackObj;
  };
}

export function stopTracking(pollId) {
  return () => {
    baseRef.child(`polls/${pollId}`).off('value', trackCallbacks[pollId].poll);
    baseRef.child('questions').off('value', trackCallbacks[pollId].questions);
  };
}

export function resetPolls() {
  return (dispatch, getState) => {
    // only for users
    if (getState().user.isUser) {
      const uid = getState().user.uid;
      const pollsRef = baseRef.child('polls');
      pollsRef.orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
        if (snapshot.exists()) dispatch(receivePollData(snapshot.val()));
      });
    }
  };
}

export function lockQuestion(questionId) {
  return () => {
    const questionRef = baseRef.child(`questions/${questionId}`);
    questionRef.update({
      locked: true,
    });
  };
}

export function newQuestion(pollId) {
  return (dispatch, getState) => {
    baseRef.child('questions').push({
      aCount: 0,
      bCount: 0,
      cCount: 0,
      dCount: 0,
      eCount: 0,
      voteCount: 0,
      voterCount: 0,
      uid: getState().user.uid,
      pollId,
    });
  };
}

export function newPoll() {
  return (dispatch, getState) => {
    // create a new poll object
    const uid = getState().user.uid;
    const pollKey = namer();
    const pollRef = baseRef.child('polls').push({
      voteCount: 0,
      voterCount: 0,
      pollKey,
      uid,
    });

    // add the new poll id to the list of polls
    const pollId = pollRef.key();
    const userRef = baseRef.child(`users/${uid}/polls`);
    userRef.update({
      [pollId]: true,
    });
    // dispatch the action
    dispatch({
      type: NEW_POLL,
      data: {
        isPollLoaded: false,
        isQuestionsLoaded: false,
      },
      pollId,
    });

    // create a new question for the newly created poll
    const questionRef = baseRef.child('questions').push({
      pollId: pollRef.key(),
      locked: false,
      voteCount: 0,
      voterCount: 0,
      aCount: 0,
      bCount: 0,
      cCount: 0,
      dCount: 0,
      eCount: 0,
      uid,
    });

    // update the question in the poll object
    pollRef.update({
      questions: {
        [questionRef.key()]: true,
      },
    });

    dispatch(push(`/s/${pollId}`));
  };
}

export function changePollKey(pollId) {
  return () => {
    const newKey = namer();
    const pollsRef = baseRef.child('polls');

    pollsRef.orderByChild('pollKey').equalTo(newKey).once('value', (data) => {
      // key already exists, try another one
      if (data.exists()) {
        changePollKey(pollId)();
        return;
      }

      // update the name in Firebase
      const pollRef = baseRef.child(`polls/${pollId}`);
      pollRef.update({
        pollKey: newKey,
      });
    });
  };
}
