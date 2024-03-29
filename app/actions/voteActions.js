import { push } from 'react-router-redux';
import baseRef from '../firebase';

export const JOIN_VOTE = 'JOIN_VOTE';
export const NOT_FOUND = 'NOT_FOUND';
export const INVALID_JOIN_VOTE = 'INVALID_JOIN_VOTE';
export const ATTEMPT_JOIN_VOTE = 'ATTEMPT_JOIN_VOTE';

export function initVoting() {
  return (dispatch, getState) => {
    const voterId = getState().vote.voterId;
    // const votesRef = baseRef.child(`votes/${voterId}`);

    // votesRef.on('value', (snapshot) => {
    //   if (snapshot.exists()) {
    //     dispatch(receiveVotesData(snapshot.val()));
    //   }
    // }, this);
  };
}

function notFound() {
  return {
    type: NOT_FOUND,
  };
}

// export function startTracking(pollId) {
//   return (dispatch) => {
//     const trackObj = {};

//     const questionsRef = baseRef.child('questions');
//     trackObj.questions = questionsRef.orderByChild('pollId').equalTo(pollId).on('value',
//       (snapshot) => {
//         if (snapshot.exists()) dispatch(receiveQuestionData(snapshot.val()));
//         else dispatch(notFound());
//       }, this);

//     trackCallbacks[pollId] = trackObj;
//   };
// }

// export function stopTracking(pollId) {
//   return () => {
//     baseRef.child('questions').off('value', trackCallbacks[pollId].questions);
//   };
// }

// export function makeVote(pollId, questionId, choice) {
//   return (dispatch, getState) => {
//     const votes = getState().vote.votes;
//     const voterId = getState().vote.voterId;
//     const choiceClean = choice.toLowerCase();
//     const questionIsLocked = getState().vote.questions[questionId].locked;
//     const pollRef = baseRef.child(`polls/${pollId}`);
//     const questionRef = baseRef.child(`questions/${questionId}`);
//     const votesRef = baseRef.child(`votes/${voterId}`);

//     // prevent voting when the question is locked.
//     if (questionIsLocked) return;

//     if (!votes[pollId]) {
//       // voter has never voted in the poll
//       pollRef.child('voterCount').transaction((val) => (val + 1));
//     }

//     // has not voted in this question yet
//     if (!votes[pollId] || !votes[pollId][questionId]) {
//       console.log('iie');
//       // update questions voter count
//       questionRef.child('voterCount').transaction((val) => (val + 1));

//       // update vote count because this is a new vote
//       pollRef.child('voteCount').transaction((val) => (val + 1));
//       questionRef.child('voteCount').transaction((val) => (val + 1));

//       // update the selective vote count
//       questionRef.child(`${choiceClean}Count`).transaction((val) => (val + 1));
//     } else {
//       // ignore if the same vote is selected
//       const prevVote = votes[pollId][questionId];
//       if (prevVote === choiceClean) return;

//       // decrement the old selection
//       questionRef.child(`${prevVote}Count`).transaction((val) => (val - 1));

//       // increment the new selection
//       questionRef.child(`${choiceClean}Count`).transaction((val) => (val + 1));
//     }

//     votesRef.update({
//       [pollId]: {
//         [questionId]: choiceClean,
//       },
//     });
//   };
// }

function joinVote(pin) {
  return (dispatch) => {
    // dispatch({ type: JOIN_VOTE });
    dispatch(push(`/l/${pin}`));
  };
}

function invalidJoinVote(pollKey) {
  return {
    type: INVALID_JOIN_VOTE,
    pollKey,
  };
}

export function attemptJoinVote(pin) {
  return (dispatch, getState) => {
    if (!getState().vote.awaitingResponse) {
      dispatch({ type: ATTEMPT_JOIN_VOTE });
      if (!pin) {
        setTimeout(() => (dispatch(invalidJoinVote(pin))), 0);
        return;
      }

      const pk = pin.toLowerCase();
      baseRef.child(`poll/${pk}`).once('value', (data) => {
        if (!data.exists()) {
          dispatch(invalidJoinVote(pk));
          return;
        }

        // direct to the voting page
        dispatch(joinVote(pin));
      });
    }
  };
}
