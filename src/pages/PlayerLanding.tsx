import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { Error, Loading } from '../components/common';
import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteData } from '../lib/api/playerLanding';
import { useGetVotingInfo } from '../lib/hooks/useGetVotingInfo';
import { stickerInfoState, votingInfoState } from '../recoil/player/atom';
import { VoteData } from '../types/vote';
import Error404 from './Error404';

const PlayerLanding = () => {
  const { voteId } = useParams<{ voteId: string }>();
  const { votingInfo, isLoading, isError } = useGetVotingInfo(Number(voteId));
  const [votingInfoAtom, setVotingInfoState] = useRecoilState(votingInfoState);
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
