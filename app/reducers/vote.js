import cookie from 'react-cookie';
import { JOIN_VOTE, INVALID_JOIN_VOTE, ATTEMPT_JOIN_VOTE } from '../actions/voteActions';

// initialize the voter id
const setNewVoterId = () => {
  const newVoterId = Math.random().toString(36).substring(7);
  cookie.save('voterId', newVoterId);
  return newVoterId;
};

const initialState = {
  voterId: cookie.load('voterId') | setNewVoterId(),
  isAwaitingResponse: false,
  errorPollKey: '',
};

const vote = (state = initialState, action) => {
  switch (action.type) {
    case ATTEMPT_JOIN_VOTE: {
      return Object.assign({}, state, {
        isAwaitingResponse: true,
      });
    }
    case INVALID_JOIN_VOTE: {
      return Object.assign({}, state, {
        isAwaitingResponse: false,
        errorPollKey: action.pollKey,
      });
    }
    case JOIN_VOTE: {
      return Object.assign({}, state, {
        isAwaitingResponse: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default vote;
