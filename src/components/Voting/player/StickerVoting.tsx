import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { STICKER_LIST } from '../../../constant/StickerIconList';
import { stickerInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { NaturalImgInfo, StickerLocation } from '../../../types/vote';
import { setStickerLocationData } from '../../../utils/setStickerLocationData';

interface StickerVotingProps {
  isStickerGuide: boolean;
}
const StickerVoting = (props: StickerVotingProps) => {
  const { isStickerGuide } = props;
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);
  const { location: stickerList, emoji } = stickerVotingInfo;
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;
    setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };

  const handleAttachSticker = (e: React.MouseEvent<HTMLImageElement>) => {
    if (stickerImgRef.current && stickerList.length !== 3 && imgInfo && imgViewInfo) {
      const { offsetX, offsetY } = e.nativeEvent;
      const newSticker: StickerLocation = {
        x: Math.round(((offsetX * imgInfo.width) / imgViewInfo.width) * 100) / 100,
        y: Math.round(((offsetY * imgInfo.height) / imgViewInfo.height) * 100) / 100,
        degRate: Math.round((Math.random() * 250 - 115) * 100) / 100,
      };
      // console.log('이미지 자체 정보', imgInfo);
      // console.log('이미지 뷰 정보', imgViewInfo);
      // console.log('이미지 정보', newSticker);
      setStickerVotingInfo((prev) => ({ ...prev, location: [...prev.location, newSticker], emoji }));
    }
  };

  return (
    <StStickerVotingWrapper>
      <StStickerImg
        onLoad={handleImgSize}
        src={pictureInfo?.url}
        ref={stickerImgRef}
        alt="selected_img"
        onClick={handleAttachSticker}
      />
      {!isStickerGuide &&
        stickerList.map((sticker, idx) => (
          <StEmojiIcon key={`sticker.x${idx}`} location={setStickerLocationData(sticker, imgViewInfo, imgInfo)}>
            {STICKER_LIST[emoji].icon()}
          </StEmojiIcon>
        ))}
    </StStickerVotingWrapper>
  );
};

export default StickerVoting;

const StStickerVotingWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2.6rem;

  position: relative;
`;

const StStickerImg = styled.img`
  width: 90%;
  height: 52rem;
  margin-top: 1.7rem;

  border-radius: 1rem;

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

    width: 5.3rem;
    height: 5.3rem;

    z-index: 3;

    transform-origin: 50% 50%;
    transform: ${({ location }) => `rotate(${location.degRate}deg)`};
  }
`;
