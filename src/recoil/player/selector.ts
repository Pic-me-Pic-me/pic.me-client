import { selector, selectorFamily } from 'recoil';

import { votingInfoState } from './atom';

export const pictureSelector = selectorFamily({
  key: 'pictureSelector',
  get:
    (pictureId: number) =>
    ({ get }) =>
      get(votingInfoState).Picture.find((info) => info.id === pictureId),
});
