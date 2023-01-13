import { NaturalImgInfo, StickerLocation } from '../types/vote';

export const setStickerLocationData = (
  getStickerInfo: StickerLocation,
  imgViewInfo?: NaturalImgInfo,
  imgInfo?: NaturalImgInfo,
) => {
  if (imgViewInfo && imgInfo) {
    console.log('이미지 자체 정보', imgInfo);
    console.log('이미지 뷰 정보', imgViewInfo);
    console.log('이미지 정보', getStickerInfo);

    const { x, y, degRate } = getStickerInfo;
    const { width, height } = imgInfo;

    return { x: (x * imgViewInfo.width) / width / 10, y: (y * imgViewInfo.height) / height / 10, degRate };
  }
  return getStickerInfo;
};
