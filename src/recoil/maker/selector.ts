import { selector } from 'recoil';

import { stickerResultState } from './atom';

export const stickerCountSelector = selector({
  key: 'stickerCountSelector',
  get: ({ get }) =>
    get(stickerResultState).reduce((accumulator, currentStickerResult) => accumulator + currentStickerResult.count, 0),
});
export const stickerMaxCountSelctor = selector({
  key: 'stickerMaxCountSelector',
  get: ({ get }) => {
    let maxIdx = 0;
    let maxCount = 0;
    get(stickerResultState).forEach((stickerResultInfo, idx) => {
      if (stickerResultInfo.count > maxCount) {
        maxIdx = idx;
        maxCount = stickerResultInfo.count;
      }
    });
    return maxIdx;
  },
});
