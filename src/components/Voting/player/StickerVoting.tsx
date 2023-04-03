import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcCancel } from '../../../asset/icon';
import { FLOWER_ICON_LIST } from '../../../constant/FlowerIconList';
import { STICKER_LIST } from '../../../constant/StickerIconList';
import { playerStickerInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { NaturalImgInfo, StickerLocation } from '../../../types/vote';
import { setStickerLocationData } from '../../../utils/setStickerLocationData';

interface StickerVotingProps {
  isStickerGuide: boolean;
}
const StickerVoting = (props: StickerVotingProps) => {
  const { isStickerGuide } = props;
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(playerStickerInfoState);
  const { location: stickerList, emoji, isFlowerVoting } = stickerVotingInfo;
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;

    console.log(naturalWidth, naturalHeight, width, height);
    setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };

  const handleAttachSticker = (e: React.MouseEvent<HTMLImageElement>) => {
    if (
      stickerImgRef.current &&
      ((!isFlowerVoting && stickerList.length !== 3) || (isFlowerVoting && !stickerList.length)) &&
      imgInfo &&
      imgViewInfo
    ) {
      const { offsetX, offsetY } = e.nativeEvent;
      if (offsetY - 27 >= 0 || offsetX - 27 >= 0) {
        const newSticker: StickerLocation = {
          x: Math.round((((offsetX - 27) * imgInfo.width) / imgViewInfo.width) * 100) / 100,
          y: Math.round((((offsetY - 27) * imgInfo.height) / imgViewInfo.height) * 100) / 100,
          degRate: Math.round((Math.random() * 250 - 115) * 100) / 100,
        };
        setStickerVotingInfo((prev) => ({
          ...prev,
          imgViewInfo,
          location: [...prev.location, newSticker],
          emoji,
          isFlowerVoting,
        }));
      }
    }
  };

  const handleDeleteSticker = (e: React.MouseEvent<SVGSVGElement>) => {
    const stickerTarget = e.currentTarget as SVGSVGElement;
    const clickStickerIdx = Number(stickerTarget.dataset.sticker);

    if (0 <= clickStickerIdx && clickStickerIdx <= 2) {
      setStickerVotingInfo((prev) => ({
        ...prev,
        location: [...stickerList.filter((_, idx) => idx !== clickStickerIdx)],
      }));
    }
  };

  useEffect(() => {
    setStickerVotingInfo({ ...stickerVotingInfo, location: [] });
    console.log(imgViewInfo);
  }, []);
  console.log('컴포넌트밖', imgViewInfo);

  return (
    <>
      <StStickerVotingWrapper>
        <article>
          <StStickerImg
            onLoad={handleImgSize}
            src={pictureInfo?.url}
            ref={stickerImgRef}
            alt="selected_img"
            onClick={handleAttachSticker}
          />
          {!isStickerGuide &&
            imgViewInfo &&
            imgInfo &&
            stickerList.map((sticker, idx) => (
              <StEmojiIcon key={`sticker.x${idx}`} location={setStickerLocationData(sticker, imgViewInfo, imgInfo)}>
                {isFlowerVoting
                  ? FLOWER_ICON_LIST[emoji].icon((54 * imgViewInfo.width) / 390)
                  : STICKER_LIST[emoji].icon((54 * imgViewInfo.width) / 390)}
                <IcCancel onClick={handleDeleteSticker} data-sticker={`${idx}`} />
              </StEmojiIcon>
            ))}
        </article>
      </StStickerVotingWrapper>
    </>
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

  & > article {
    width: 90%;

    position: relative;
  }
`;

const StStickerImg = styled.img`
  width: 100%;
  height: 52rem;

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

    z-index: 3;

    transform-origin: 50% 50%;
    transform: ${({ location }) => `rotate(${location.degRate}deg)`};
  }
  &:hover {
    & > svg:last-child {
      display: block;
      transform: none;
    }
  }
`;
