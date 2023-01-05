import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IcHeaderLogo } from '../../asset/icon';
import { HeaderLayout } from '../../components/Layout';
import { VotingLayout } from '../../components/Layout/player';
import PictureSlider from '../../components/Voting/player/PictureSlider';

const PictureVoting = () => {
  const navigate = useNavigate();
  const handleVotingSuccess = async () => {
    navigate('/player/voting');
  };
  const handlePrevpage = () => {
    navigate('/player');
  };
  return (
    <div>
      <HeaderLayout HeaderTitle={<IcHeaderLogo />} handleGoback={handlePrevpage} />

      <VotingLayout
        votingTitle="햅히 체고"
        btnTitle="이 사진으로 하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {<PictureSlider />}
      </VotingLayout>
    </div>
  );
};

export default PictureVoting;
