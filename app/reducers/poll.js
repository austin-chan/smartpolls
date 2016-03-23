import { RECEIVE_POLL_DATA, RECEIVE_QUESTION_DATA, NEW_POLL } from '../actions/pollActions';

const initialState = {
  awaitingInitialLoad: true,
  polls: {},
};

const poll = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POLL_DATA: {
      const polls = Object.assign({}, state.polls);
      const overrideData = action.data;
      Object.keys(overrideData).forEach((pollId) => {
        polls[pollId] = Object.assign({}, polls[pollId], overrideData[pollId]);
      });

      return Object.assign({}, state, {
        awaitingInitialLoad: false,
        polls,
      });
    }
    case RECEIVE_QUESTION_DATA: {
      return Object.assign({}, state, {
        polls: Object.assign({}, state.polls, {
          [action.pollId]: Object.assign({}, state.polls[action.pollId], {
            isQuestionsLoaded: true,
            questions: action.data,
          }),
        }),
      });
    }
    case NEW_POLL: {
      return Object.assign({}, state, {
        polls: Object.assign({}, state.polls, {
          [action.pollId]: action.data,
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
