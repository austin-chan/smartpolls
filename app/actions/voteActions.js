import { push } from 'react-router-redux';
import baseRef from '../firebase';

export const RECEIVE_VOTE_DATA = 'RECEIVE_VOTE_DATA';
export const RECEIVE_QUESTION_DATA = 'RECEIVE_QUESTION_DATA';
export const JOIN_VOTE = 'JOIN_VOTE';
export const NOT_FOUND = 'NOT_FOUND';
export const INVALID_JOIN_VOTE = 'INVALID_JOIN_VOTE';
export const ATTEMPT_JOIN_VOTE = 'ATTEMPT_JOIN_VOTE';

const trackCallbacks = {};

function receiveVotesData(data) {
  return {
    type: RECEIVE_VOTE_DATA,
    data,
  };
}

function receiveQuestionData(data) {
  return {
    type: RECEIVE_QUESTION_DATA,
    data,
  };
}

export function initVoting() {
  return (dispatch, getState) => {
    const voterId = getState().vote.voterId;
    const votesRef = baseRef.child(`votes/${voterId}`);

    votesRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(receiveVotesData(snapshot.val()));
      }
    }, this);
  };
}

function notFound() {
  return {
    type: NOT_FOUND,
  };
}

export function startTracking(pollId) {
  return (dispatch) => {
    const trackObj = {};

    const questionsRef = baseRef.child('questions');
    trackObj.questions = questionsRef.orderByChild('pollId').equalTo(pollId).on('value',
      (snapshot) => {
        if (snapshot.exists()) dispatch(receiveQuestionData(snapshot.val()));
        else dispatch(notFound());
      }, this);

    trackCallbacks[pollId] = trackObj;
  };
}

export function stopTracking(pollId) {
  return () => {
    baseRef.child('questions').off('value', trackCallbacks[pollId].questions);
  };
}

export function makeVote(pollId, questionId, choice) {
  return (dispatch, getState) => {
    const votes = getState().vote.votes;
    const voterId = getState().vote.voterId;
    const choiceClean = choice.toLowerCase();
    const pollRef = baseRef.child(`polls/${pollId}`);
    const questionRef = baseRef.child(`questions/${questionId}`);
    const votesRef = baseRef.child(`votes/${voterId}`);

    if (!votes[pollId]) {
      // voter has never voted in the poll
      pollRef.child('voterCount').transaction((val) => (val + 1));
    }

    // has not voted in this question yet
    if (!votes[pollId] || !votes[pollId][questionId]) {
      // update questions voter count
      questionRef.child('voterCount').transaction((val) => (val + 1));

      // update vote count because this is a new vote
      pollRef.child('voteCount').transaction((val) => (val + 1));
      questionRef.child('voteCount').transaction((val) => (val + 1));

      // update the selective vote count
      questionRef.child(`${choiceClean}Count`).transaction((val) => (val + 1));
    } else {
      // ignore if the same vote is selected
      const prevVote = votes[questionId];
      if (prevVote === choiceClean) return;

      // decrement the old selection
      questionRef.child(`${prevVote}Count`).transaction((val) => (val - 1));

      // increment the new selection
      questionRef.child(`${choiceClean}Count`).transaction((val) => (val + 1));
    }

    votesRef.update({
      [pollId]: {
        [questionId]: choiceClean,
      }
    });
  };
}

function joinVote(pollId) {
  return (dispatch) => {
    dispatch({ type: JOIN_VOTE });
    dispatch(push(`/v/${pollId}`));
  };
}

function invalidJoinVote(pollKey) {
  return {
    type: INVALID_JOIN_VOTE,
    pollKey,
  };
}

export function attemptJoinVote(pollKey) {
  return (dispatch, getState) => {
    if (!getState().vote.awaitingResponse) {
      dispatch({ type: ATTEMPT_JOIN_VOTE });
      if (!pollKey) {
        setTimeout(() => (dispatch(invalidJoinVote(pollKey))), 0);
        return;
      }

      baseRef.child('polls').orderByChild('pollKey').equalTo(pollKey)
        .once('value', (data) => {
          if (!data.exists()) {
            dispatch(invalidJoinVote(pollKey));
            return;
          }

          // direct to the voting page
          const pollId = Object.keys(data.val())[0];
          dispatch(joinVote(pollId));
        });
    }
  };
}
