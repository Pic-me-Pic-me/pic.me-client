import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { FLOWER_ICON_LIST } from '../../constant/FlowerIconList';
import { STICKER_LIST } from '../../constant/StickerIconList';
import { stickerResultState } from '../../recoil/maker/atom';
import { NaturalImgInfo, StickerLocation } from '../../types/vote';
import { setStickerLocationData } from '../../utils/setStickerLocationData';

interface StickerAttachImgProps {
  stickerAttachImgSrc: string;
  imgWrapperWidthPercent: number;
  imgHight: number;
  imgViewInfo: NaturalImgInfo;
}
const StickerAttachFlowerImg = (props: StickerAttachImgProps) => {
  const { stickerAttachImgSrc, imgWrapperWidthPercent, imgHight, imgViewInfo } = props;

  const stickerResult = useRecoilValue(stickerResultState);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  // const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;
    // console.log(width, height, '온로드요');
    // setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };

  // console.log(imgViewInfo, '꽃');

  return (
    <>
      <StStickerAttachImgWrapper width={imgWrapperWidthPercent}>
        <StStickerAttachImg onLoad={handleImgSize} height={imgHight} src={stickerAttachImgSrc} alt="선택된 사진" />
        {imgViewInfo &&
          imgInfo &&
          stickerResult.map(({ stickerLocation, emoji }, idx) =>
            stickerLocation.map((sticker, stickerIdx) => (
              <StEmojiIcon
                key={`sticker${stickerIdx}_${emoji}`}
                location={setStickerLocationData(sticker, imgViewInfo, imgInfo)}>
                {FLOWER_ICON_LIST[emoji].icon((54 * imgViewInfo.width) / 390)}
              </StEmojiIcon>
            )),
          )}
      </StStickerAttachImgWrapper>
    </>
  );
};
export default StickerAttachFlowerImg;

const StStickerAttachImgWrapper = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: ${({ width }) => width}%;
  overflow: hidden;
`;

const StStickerAttachImg = styled.img<{ height: number }>`
  position: relative;

  width: 100%;
  height: ${({ height }) => height}rem;

  border-radius: 1.2rem;

  object-fit: cover;
`;

const StEmojiIcon = styled.div<{ location: StickerLocation }>`
  position: absolute;
  left: ${({ location }) => location.x}rem;
  top: ${({ location }) => location.y}rem;

  & > svg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    transform-origin: 50% 50%;
    transform: ${({ location }) => `rotate(${location.degRate}deg)`};
  }
`;
