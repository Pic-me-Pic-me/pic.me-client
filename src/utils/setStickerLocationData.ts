import { NaturalImgInfo, StickerLocation } from '../types/vote';

export const setStickerLocationData = (
  getStickerInfo: StickerLocation,
  imgViewInfo: NaturalImgInfo,
  imgInfo: NaturalImgInfo,
) => {
  const { x, y, degRate } = getStickerInfo;
  const { width, height } = imgInfo;

  return { x: (x * imgViewInfo.width) / width / 10, y: (y * imgViewInfo.height) / height / 10, degRate };
};
