import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcBlackHeaderFirst, IcHeaderSecond } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { ReasonSlider } from '../../components/Voting/player';
import { CONFIRM_REASON, FLOWER_VOTING_TITLE, SELECT_REASON, VOTING_TITLE } from '../../constant/playerInfo';
import { playerStickerInfoState } from '../../recoil/player/atom';
import { pictureSelector } from '../../recoil/player/selector';

const ReasonVoting = () => {
  const navigate = useNavigate();
  const [playerStickerInfo, setStickerInfo] = useRecoilState(playerStickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(playerStickerInfo.pictureId));
  const { isFlowerVoting } = playerStickerInfo;

  const handleVotingSuccess = () =>
    isFlowerVoting ? navigate('/player/flower/keyword_voting') : navigate('/player/sticker_voting');

  const handlePrevpage = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setStickerInfo((prev) => ({ ...prev, pictureId: playerStickerInfo.pictureId, location: [], emoji: 0 }));
  }, []);

  return (
    <div>
      {isFlowerVoting ? (
        <HeaderLayout isBackIcon={true} IcHeaderSequence={<IcBlackHeaderFirst />} />
      ) : (
        <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderSecond />} />
      )}
      <VotingLayout
        votingTitle={isFlowerVoting ? FLOWER_VOTING_TITLE : VOTING_TITLE}
        pageType="ReasonVoting"
        btnTitle={isFlowerVoting ? CONFIRM_REASON : SELECT_REASON}
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {
          <StReasonVotingWrpper>
            <img src={pictureInfo?.url} alt="사진 이유고르기" />
            <ReasonSlider isFlowerVoting={isFlowerVoting} />
          </StReasonVotingWrpper>
        }
      </VotingLayout>
    </div>
  );
};

export default ReasonVoting;

const StReasonVotingWrpper = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;

  position: relative;

  width: 100%;

  & > img {
    width: 90%;
    height: 52rem;
    margin-bottom: 1.3rem;
    border-radius: 1rem;

    object-fit: cover;

    touch-action: pan-y;
  }
`;
