import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { STICKER_LIST } from '../../../constant/StickerIconList';
import { useGetResultVoting } from '../../../lib/hooks/useGetResultVoting';
import { stickerInfoState, votingInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { StickerLocation, StickerResultInfo } from '../../../types/vote';
import { Error, Loading } from '../../common';

const StickerResultVoting = () => {
  const stickerVotingInfo = useRecoilValue(stickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);

  const { stickerInfo, isLoading, isError } = useGetResultVoting(stickerVotingInfo.pictureId);
  const [resultStickerList, setResultStickerList] = useState<StickerResultInfo[]>([]);

  useEffect(() => {
    if (stickerInfo) {
      const { Sticker } = stickerInfo;
      const getStickerList = Sticker.filter(({ emoji, count, stickerLocation }) => stickerLocation !== '').map(
        ({ emoji, count, stickerLocation }) => {
          const jsonLocation = JSON.parse(stickerLocation) as StickerLocation[];
          return {
            stickerLocation: jsonLocation,
            emoji,
            count,
          };
        },
      );
      setResultStickerList([...getStickerList]);
    }
  }, [stickerInfo]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <StStickerVotingWrapper>
      <StStickerImg src={pictureInfo?.url} ref={stickerImgRef} alt="selected_img" />
      {resultStickerList.map(({ stickerLocation, emoji }, idx) =>
        stickerLocation.map(({ x, y, degRate }, stickerIdx) => (
          <StEmojiIcon key={`sticker${stickerIdx}_${emoji}`} locationX={x} locationY={y} degRate={degRate}>
            {STICKER_LIST[emoji].icon()}
          </StEmojiIcon>
        )),
      )}
    </StStickerVotingWrapper>
  );
};
export default StickerResultVoting;
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
const StEmojiIcon = styled.div<{ locationX: number; locationY: number; degRate: number }>`
  position: absolute;
  left: ${({ locationX }) => locationX}rem;
  top: ${({ locationY }) => locationY}rem;

  & > svg {
    position: absolute;
    left: 0;
    top: 0;

    width: 5.3rem;
    height: 5.3rem;

    z-index: 3;

    transform-origin: 50% 50%;
    transform: ${({ degRate }) => `rotate(${degRate}deg)`};
  }
`;
