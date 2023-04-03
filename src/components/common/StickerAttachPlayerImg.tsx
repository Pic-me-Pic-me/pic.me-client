import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { FLOWER_ICON_LIST } from '../../constant/FlowerIconList';
import { STICKER_LIST } from '../../constant/StickerIconList';
import { stickerResultState } from '../../recoil/maker/atom';
import { playerStickerInfoState } from '../../recoil/player/atom';
import { NaturalImgInfo, StickerLocation } from '../../types/vote';
import { setStickerLocationData } from '../../utils/setStickerLocationData';

interface StickerAttachPlayerImgProps {
  stickerAttachImgSrc: string;
  imgWrapperWidthPercent: number;
  imgHight: number;
  isFlowerVoting?: boolean;
}
const StickerAttachPlayerImg = (props: StickerAttachPlayerImgProps) => {
  const { stickerAttachImgSrc, imgWrapperWidthPercent, imgHight, isFlowerVoting } = props;

  const playerStickerInfo = useRecoilValue(playerStickerInfoState);
  const { imgViewInfo } = playerStickerInfo;
  const stickerResult = useRecoilValue(stickerResultState);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight } = e.target as HTMLImageElement;
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };
  return (
    <>
      <StStickerAttachImgWrapper width={imgWrapperWidthPercent}>
        <StStickerAttachImg onLoad={handleImgSize} height={imgHight} src={stickerAttachImgSrc} alt="선택된 사진" />
        {imgViewInfo.width &&
          imgInfo &&
          stickerResult.map(({ stickerLocation, emoji }) =>
            stickerLocation.map((sticker, stickerIdx) => (
              <StEmojiIcon
                key={`sticker${stickerIdx}_${emoji}`}
                location={setStickerLocationData(sticker, imgViewInfo, imgInfo)}>
                {isFlowerVoting
                  ? FLOWER_ICON_LIST[emoji].icon((54 * imgViewInfo.width) / 390)
                  : STICKER_LIST[emoji].icon((54 * imgViewInfo.width) / 390)}
              </StEmojiIcon>
            )),
          )}
      </StStickerAttachImgWrapper>
    </>
  );
};
export default StickerAttachPlayerImg;

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
