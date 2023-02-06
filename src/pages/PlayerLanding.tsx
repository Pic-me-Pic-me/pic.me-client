import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { Error, Loading } from '../components/common';
import { FinishedLanding, VoteLanding } from '../components/Landing';
import { LandingPlayer } from '../components/Landing/player';
import { useGetVotingInfo } from '../lib/hooks/useGetVotingInfo';
import { stickerInfoState, votingInfoState } from '../recoil/player/atom';

const PlayerLanding = () => {
  const { voteId } = useParams<{ voteId: string }>();

  const { votingInfo, isLoading, isError } = useGetVotingInfo(voteId);

  const setVotingInfoState = useSetRecoilState(votingInfoState);
  const resetVotingInfoState = useResetRecoilState(stickerInfoState);
  const resetStickerInfoState = useResetRecoilState(stickerInfoState);

  useEffect(() => {
    if (votingInfo?.data) {
      resetVotingInfoState();
      resetStickerInfoState();
      setVotingInfoState({
        ...votingInfo?.data,
      });
    }
  }, [votingInfo]);

  if (isLoading) return <LandingPlayer />;
  if (isError) return <Error />;

  if (votingInfo?.status === 200 && votingInfo.data) return <VoteLanding />;
  return <FinishedLanding />;
};

export default PlayerLanding;
