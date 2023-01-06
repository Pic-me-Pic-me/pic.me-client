import { selector } from 'recoil';

import { votingInfoState } from './atom';

export const pictureSelector = selector({
  key: 'pictureSelector',
  get: ({ get }) => get(votingInfoState).picture.find((pictureInfo) => pictureInfo.isSelect),
});
