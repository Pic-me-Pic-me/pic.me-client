import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { IcHeaderLogo } from '../../asset/icon';
import { Error, Loading } from '../../components/common';
import { HeaderLayout } from '../../components/Layout';
import { VotingLayout } from '../../components/Layout/player';
import PictureSlider from '../../components/Voting/player/PictureSlider';
import { useGetVotingInfo } from '../../lib/hooks/useGetVotingInfo';
import { votingInfoState } from '../../recoil/player/atom';

const PictureVoting = () => {
  const { voteid } = useParams();
  const { votingInfo, isLoading, isError } = useGetVotingInfo(Number(voteid));
  const [votingInfoAtom, setVotingInfoState] = useRecoilState(votingInfoState);

  const navigate = useNavigate();
  const handleVotingSuccess = async () => {
    navigate('/player/reason_voting');
  };
  const handlePrevpage = () => {
    navigate('/player');
  };
  useEffect(() => {
    if (votingInfo?.data.data) {
      setVotingInfoState(votingInfo.data.data);
    }
  }, [votingInfo]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div>
      <HeaderLayout HeaderTitle={<IcHeaderLogo />} handleGoback={handlePrevpage} />

      <VotingLayout
        votingTitle={votingInfoAtom.voteTitle}
        btnTitle="이 사진으로 하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {<PictureSlider />}
      </VotingLayout>
    </div>
  );
};

export default PictureVoting;
