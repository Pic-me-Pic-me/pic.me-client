import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { Error, Loading } from '../components/common';
import { FinishedLanding, VoteLanding } from '../components/Landing';
import { useGetVotingInfo } from '../lib/hooks/useGetVotingInfo';
import { votingInfoState } from '../recoil/player/atom';

const PlayerLanding = () => {
  const { voteId } = useParams<{ voteId: string }>();
  const { votingInfo, isLoading, isError } = useGetVotingInfo(Number(voteId));
  const setVotingInfoState = useSetRecoilState(votingInfoState);
  useEffect(() => {
    if (votingInfo?.data) {
      setVotingInfoState({
        ...votingInfo?.data,
      });
    }
  }, []);
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  if (votingInfo?.status === 200 && votingInfo.data) return <VoteLanding />;
  return <FinishedLanding />;
};

export default PlayerLanding;
