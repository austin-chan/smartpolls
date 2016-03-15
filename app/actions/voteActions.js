import { push } from 'react-router-redux';
import baseRef from '../firebase';

export const JOIN_VOTE = 'JOIN_VOTE';
export const INVALID_JOIN_VOTE = 'INVALID_JOIN_VOTE';
export const ATTEMPT_JOIN_VOTE = 'ATTEMPT_JOIN_VOTE';

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
    if (!getState().vote.isAwaitingResponse) {
      dispatch({ type: ATTEMPT_JOIN_VOTE });
      if (!pollKey) return setTimeout(() => (dispatch(invalidJoinVote(pollKey))), 0);

      baseRef.child(`polls`).orderByChild('poll_key').equalTo(pollKey)
        .once('value', (data) => {
          if (!data.exists()) return dispatch(invalidJoinVote(pollKey));

          // direct to the voting page
          const pollId = Object.keys(data.val())[0];
          dispatch(joinVote(pollId));
        });
    }
  };
}
