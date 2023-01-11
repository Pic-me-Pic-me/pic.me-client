import { GetStickerResultInfo, StickerLocation } from '../types/vote';

export const jsonGetStickerList = (stickerResultList: GetStickerResultInfo[]) => {
  const jsonStickerList = stickerResultList
    .filter(({ emoji, count, stickerLocation }) => stickerLocation !== '')
    .map(({ emoji, count, stickerLocation }) => {
      const jsonLocation = JSON.parse(stickerLocation) as StickerLocation[];
      return {
        stickerLocation: jsonLocation,
        emoji,
        count,
      };
    });

  return jsonStickerList;
};
