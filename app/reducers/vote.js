import cookie from 'react-cookie';
import { JOIN_VOTE, INVALID_JOIN_VOTE, ATTEMPT_JOIN_VOTE, NOT_FOUND, RECEIVE_VOTE_DATA,
  RECEIVE_QUESTION_DATA } from '../actions/voteActions';

// initialize the voter id
const setNewVoterId = () => {
  const newVoterId = Math.random().toString(36).substring(7);
  cookie.save('voterId', newVoterId);
  return newVoterId;
};

const initialState = {
  voterId: cookie.load('voterId') || setNewVoterId(),
  awaitingResponse: false,
  notFound: false,
  errorPollKey: '',
  votes: {},
  questions: {},
};

const vote = (state = initialState, action) => {
  switch (action.type) {
    case ATTEMPT_JOIN_VOTE: {
      return Object.assign({}, state, {
        awaitingResponse: true,
      });
    }
    case RECEIVE_VOTE_DATA: {
      return Object.assign({}, state, {
        votes: action.data,
      });
    }
    case RECEIVE_QUESTION_DATA: {
      return Object.assign({}, state, {
        questions: action.data,
      });
    }
    case NOT_FOUND: {
      return Object.assign({}, state, {
        notFound: true,
      });
    }
    case INVALID_JOIN_VOTE: {
      return Object.assign({}, state, {
        awaitingResponse: false,
        errorPollKey: action.pollKey,
      });
    }
    case JOIN_VOTE: {
      return Object.assign({}, state, {
        awaitingResponse: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default vote;
