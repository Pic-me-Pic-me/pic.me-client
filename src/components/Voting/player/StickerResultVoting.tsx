import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { STICKER_LIST } from '../../../constant/StickerIconList';
import { useGetResultVoting } from '../../../lib/hooks/useGetResultVoting';
import { stickerInfoState, votingInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { NaturalImgInfo, StickerLocation, StickerResultInfo } from '../../../types/vote';
import { jsonGetStickerList } from '../../../utils/jsonGetStickerList';
import { setStickerLocationData } from '../../../utils/setStickerLocationData';
import { Error, Loading } from '../../common';

const StickerResultVoting = () => {
  const stickerVotingInfo = useRecoilValue(stickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const stickerImgRef = useRef<HTMLImageElement>(null);
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const { stickerInfo, isLoading, isError } = useGetResultVoting(stickerVotingInfo.pictureId);
  const [resultStickerList, setResultStickerList] = useState<StickerResultInfo[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (stickerInfo) {
      const { Sticker } = stickerInfo;
      setResultStickerList([...jsonGetStickerList(Sticker)]);
    }
  }, [stickerInfo]);

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;
    setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
    // setResultStickerList([ resultStickerList.map(({ stickerLocation, emoji }, idx) =>
    //         stickerLocation.map((stickerLocationInfo, stickerIdx) => setStickerLocationData()])
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <StStickerVotingWrapper>
      <article>
        <StStickerImg onLoad={handleImgSize} src={pictureInfo?.url} ref={stickerImgRef} alt="selected_img" />
        {imgViewInfo &&
          imgInfo &&
          resultStickerList.map(({ stickerLocation, emoji }, idx) =>
            stickerLocation.map((stickerLocationInfo, stickerIdx) => (
              <StEmojiIcon
                key={`sticker${stickerIdx}_${emoji}`}
                location={setStickerLocationData(stickerLocationInfo, imgViewInfo, imgInfo)}>
                {STICKER_LIST[emoji].icon()}
              </StEmojiIcon>
            )),
          )}
      </article>
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

    width: 5.3rem;
    height: 5.3rem;

    z-index: 3;

    transform-origin: 50% 50%;
    transform: ${({ location }) => `rotate(${location.degRate}deg)`};
  }
`;
