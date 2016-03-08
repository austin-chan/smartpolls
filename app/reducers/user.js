import baseRef from '../firebase.js';

const initialState = {
  isUser: baseRef.getAuth() !== null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'FIRST': {
      state.test = 'test';
      break;
    }
    default: {
      return state;
    }
  }
};

export default user;
