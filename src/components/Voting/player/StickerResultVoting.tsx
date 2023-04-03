import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { FLOWER_VOTING_TYPE } from '../../../constant/playerInfo';
import { useGetResultVoting } from '../../../lib/hooks/useGetResultVoting';
import { stickerResultState } from '../../../recoil/maker/atom';
import { playerStickerInfoState } from '../../../recoil/player/atom';
import { pictureSelector } from '../../../recoil/player/selector';
import { jsonFlowerGetStickerList } from '../../../utils/jsonGetStickerList';
import { Error, Loading, StickerAttachImg } from '../../common';
import StickerAttachPlayerImg from '../../common/StickerAttachPlayerImg';

const StickerResultVoting = () => {
  const stickerVotingInfo = useRecoilValue(playerStickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));
  const { stickerInfo, isLoading, isError } = useGetResultVoting(stickerVotingInfo.pictureId);

  const setStickerResultState = useSetRecoilState(stickerResultState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (stickerInfo) {
      const { Sticker } = stickerInfo;
      setStickerResultState([...jsonFlowerGetStickerList(Sticker, stickerVotingInfo.isFlowerVoting)]);
    }
  }, [stickerInfo]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  console.log(stickerVotingInfo, '결과');

  return (
    <StStickerVotingWrapper>
      {pictureInfo && (
        <StickerAttachPlayerImg
          stickerAttachImgSrc={pictureInfo.url}
          imgWrapperWidthPercent={90}
          imgHight={52}
          isFlowerVoting={stickerInfo?.type === FLOWER_VOTING_TYPE}
        />
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

  position: relative;
  margin-bottom: 2.6rem;

  & > article {
    width: 100%;
  }
`;
