import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcHeaderFirst, IcHeaderLogo } from '../../asset/icon';
import { Error, Loading } from '../../components/common';
import { LandingHeader, LandingPictureSlider, LandingVoting } from '../../components/Landing/player';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import PictureSlider from '../../components/Voting/player/PictureSlider';
import { useGetVotingInfo } from '../../lib/hooks/useGetVotingInfo';
import { votingInfoState } from '../../recoil/player/atom';

const PictureVoting = () => {
  const navigate = useNavigate();
  const votingInfoAtom = useRecoilValue(votingInfoState);

  const handleVotingSuccess = async () => {
    navigate('/player/reason_voting');
  };
  const handlePrevpage = () => {
    navigate('/player');
  };
  return (
    <div>
      <HeaderLayout isSideIcon={true} handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderFirst />} />
      <VotingLayout
        votingTitle={votingInfoAtom.voteTitle}
        pageType="PictureVoting"
        votingSubTitle="*당신의 모든 선택은 익명으로 전달됩니다"
        margin={1}
        btnTitle="이 사진으로 하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {<PictureSlider />}
      </VotingLayout>
    </div>
  );
};

export default PictureVoting;
