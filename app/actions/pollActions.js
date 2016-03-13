import { push } from 'react-router-redux';
import baseRef from '../firebase';

export const NEW_POLL = 'NEW_POLL';

export function newPoll() {
  return {
    type: NEW_POLL,
  };
};
