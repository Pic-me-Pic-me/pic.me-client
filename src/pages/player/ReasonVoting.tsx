import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcHeaderSecond } from '../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import { ReasonSlider, StickerGuide } from '../../components/Voting/player';
import { stickerInfoState, votingInfoState } from '../../recoil/player/atom';
import { pictureSelector } from '../../recoil/player/selector';

const ReasonVoting = () => {
  const navigate = useNavigate();
  const [stickerInfo, setStickerInfo] = useRecoilState(stickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(stickerInfo.pictureId));
  const resetStickerInfoState = useResetRecoilState(stickerInfoState);
  const sticker = useRecoilValue(stickerInfoState);

  const handleVotingSuccess = async () => {
    navigate('/player/sticker_voting');
  };
  const handlePrevpage = () => {
    navigate(-1);
  };

  console.log(sticker);

  useEffect(() => {
    window.scrollTo(0, 0);
    setStickerInfo((prev) => ({ ...prev, pictureId: stickerInfo.pictureId, location: [], emoji: 0 }));
  }, []);

  return (
    <div>
      <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderSecond />} />
      <VotingLayout
        votingTitle="사진을 선택한 이유를 골라주세요"
        pageType="ReasonVoting"
        btnTitle="이유 확정하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {
          <StReasonVotingWrpper>
            <img src={pictureInfo?.url} alt="사진 이유고르기" />
            <ReasonSlider />
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
