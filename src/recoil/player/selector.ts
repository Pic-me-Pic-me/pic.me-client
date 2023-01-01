import { selector } from 'recoil';

import { votingInfoState } from './atom';

export const votingStateSelector = selector({
  key: 'votingSelector',

  get: ({ get }) => get(votingInfoState),
  set: ({ set }, newVotingInfo) => {
    set(votingInfoState, newVotingInfo);
  },
});
