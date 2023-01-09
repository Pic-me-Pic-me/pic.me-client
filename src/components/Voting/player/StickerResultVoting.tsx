import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { STICKER_LIST } from '../../../constant/StickerIconList';
import { useGetResultVoting } from '../../../lib/hooks/useGetResultVoting';
import { stickerInfoState, votingInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { StickerLocation, StickerResultInfo } from '../../../types/voting';

const StickerResultVoting = () => {
  const { vote_id } = useRecoilValue(votingInfoState);
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);

  const { location, emoji } = stickerVotingInfo;
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);
  const [resultStickerList, setResultStickerList] = useState<StickerResultInfo[]>([
    {
      stickerLocation: location,
      emoji,
      count: location.length,
    },
  ]);

  // const u = useResetRecoilState(stickerInfoState);
  // u();
  //   const { stickerInfo, isLoading, isError } = useGetResultVoting(vote_id);

  useEffect(() => {
    // if (stickerInfo?.data.data) {
    //   const { Picture, Sticker } = stickerInfo.data.data;
    //   const json =
    //     '[{"x":1.2,"y":2.4},{"x":11,"y":20},{"x":1.7,"y":2.5},{"x":11,"y":12.2},{"x":1.5,"y":3.2},{"x":1.8,"y":3.5},{"x":34.2,"y":123.5}]';

    //   setResultStickerList({ ...stickerList, ...JSON.parse(json) });
    // }
    const json = [
      {
        stickerLocation:
          '[{"x":1.2,"y":2.4},{"x":11,"y":20},{"x":1.7,"y":2.5},{"x":11,"y":12.2},{"x":1.5,"y":3.2},{"x":1.8,"y":3.5},{"x":34.2,"y":123.5}]',
        emoji: 0,
        count: 1,
      },
      {
        stickerLocation:
          '[{"x":10.2,"y":17.5},{"x":34.2,"y":123.5},{"x":44,"y":80.5},{"x":34.2,"y":49},{"x":20,"y":48},{"x":34.2,"y":123.5},{"x":34.2,"y":123.5}]',
        emoji: 1,
        count: 2,
      },
      {
        stickerLocation: '[{"x":3,"y":12.5}]',
        emoji: 2,
        count: 3,
      },
      {
        stickerLocation:
          '[{"x":34.2,"y":13.5},{"x":34.2,"y":93.5},{"x":34.2,"y":123.5},{"x":34.2,"y":123.5},{"x":34.2,"y":22.5},{"x":14.2,"y":3.5},{"x":50.2,"y":60.5}]',
        emoji: 3,
        count: 4,
      },
    ];

    // const name = newJson.map((data) => {...data, degRate : Math.random() * 270 - 135});
    const info = json.map((data) => {
      const dataArray = JSON.parse(data.stickerLocation) as StickerLocation[];
      const newLocation = dataArray.map((sticker) => ({
        x: sticker.x,
        y: sticker.y,
        degRate: Math.random() * 270 - 135,
      }));
      return {
        stickerLocation: newLocation,
        emoji: data.emoji,
        count: data.count,
      };
    });

    setResultStickerList([...resultStickerList, ...info]);
  }, []);
  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;

  return (
    <StStickerVotingWrapper>
      <StStickerImg src={pictureInfo?.url} ref={stickerImgRef} alt="selected_img" />
      {resultStickerList.map(({ stickerLocation, emoji }, idx) =>
        stickerLocation.map(({ x, y, degRate }) => (
          <StEmojiIcon key={`sticker.x${idx}+${x}+${y}${degRate}`} locationX={x} locationY={y} degRate={degRate}>
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
