import { RESET_POLLS, NEW_POLL } from '../actions/pollActions';

const initialState = {
  awaitingPayload: true,
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
    default: {
      // console.log('wewe');
      return state;
    }
  }
};

export default poll;
