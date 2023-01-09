import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcHeaderFirst, IcHeaderLogo } from '../../asset/icon';
import { Error, Loading } from '../../components/common';
import { LandingHeader, LandingPictureSlider, LandingVoting } from '../../components/Landing/player';
import { HeaderLayout, VotingLayout } from '../../components/Layout/player';
import PictureSlider from '../../components/Voting/player/PictureSlider';
import { useGetVotingInfo } from '../../lib/hooks/useGetVotingInfo';
import { votingInfoState } from '../../recoil/player/atom';

const PictureVoting = () => {
  const { voteid } = useParams();
  const navigate = useNavigate();
  // const { votingInfo, isLoading, isError } = useGetVotingInfo(Number(voteid));
  const [votingInfoAtom, setVotingInfoState] = useRecoilState(votingInfoState);
  // const r = useResetRecoilState(votingInfoState);
  // r();
  const [isLoading, setIsLoading] = useState(true);
  const handleVotingSuccess = async () => {
    navigate('/player/reason_voting');
  };
  const handlePrevpage = () => {
    navigate('/player');
  };
  useEffect(() => {
    // if (votingInfo?.data.data) {
    //   const newVoting = votingInfo.data.data;
    //   setVotingInfoState({
    //     ...votingInfoAtom,
    //     vote_id: newVoting.vote_id,
    //     vote_status: newVoting.vote_status,
    //     vote_title: newVoting.vote_title,
    //   });
    // }
  }, []);

  // if (isLoading) return <Loading />;
  // if (isError) return <Error />;
  return (
    <div>
      {isLoading ? (
        <>
          <LandingHeader />
          <LandingVoting pageType="PictureVoting" margin={0.3}>
            <LandingPictureSlider />
          </LandingVoting>
        </>
      ) : (
        <>
          <HeaderLayout isSideIcon={true} handleGoback={handlePrevpage} IcHeaderSequence={<IcHeaderFirst />} />
          <VotingLayout
            votingTitle={votingInfoAtom.vote_title}
            pageType="PictureVoting"
            votingSubTitle="*당신의 모든 선택은 익명으로 전달됩니다"
            margin={1}
            btnTitle="이 사진으로 하기"
            isActiveBtn={true}
            handlePlayer={handleVotingSuccess}>
            {<PictureSlider />}
          </VotingLayout>
        </>
      )}
    </div>
  );
};

export default PictureVoting;
