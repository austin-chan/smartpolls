import { RESET_POLLS, NEW_POLL, AWAITING_CHANGE_POLL_KEY, CHANGE_POLL_KEY,
  START_TRACKING } from '../actions/pollActions';

const initialState = {
  awaitingPayload: true,
  awaitingNameChange: false,
  polls: {},
};

const poll = (state = initialState, action) => {
  switch (action.type) {
    case RESET_POLLS: {
      return Object.assign({}, state, {
        awaitingPayload: false,
        polls: Object.assign({}, action.polls),
      });
    }
    case NEW_POLL: {
      return Object.assign({}, state, {
        polls: Object.assign({}, state.polls, {
          [action.pollId]: {
            pollKey: action.pollKey,
            uid: action.uid,
          },
        }),
      });
    }
    case AWAITING_CHANGE_POLL_KEY: {
      return Object.assign({}, state, {
        awaitingNameChange: true,
      });
    }
    case CHANGE_POLL_KEY: {
      const newPoll = Object.assign({}, state.polls[action.pollId], {
        pollKey: action.pollKey,
      });

      return Object.assign({}, state, {
        awaitingNameChange: false,
        polls: Object.assign({}, state.polls, {
          [action.pollId]: newPoll,
        }),
      });
    }
    case START_TRACKING: {
      const newPolls = Object.assign({}, state.polls, {
        [action.pollId]: action.questionData,
      });

      return Object.assign({}, state, {
        polls: newPolls,
      });
    }
    default: {
      // console.log('wewe');
      return state;
    }
  }
};

export default poll;
