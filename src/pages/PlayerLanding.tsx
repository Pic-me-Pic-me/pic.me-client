import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { Error } from '../components/common';
import { FinishedLanding, VoteLanding } from '../components/Landing';
import { LandingPlayer } from '../components/Landing/player';
import { FLOWER_VOTING_TYPE } from '../constant/playerInfo';
import { useGetVotingInfo } from '../lib/hooks/useGetVotingInfo';
import { playerStickerInfoState, votingInfoState } from '../recoil/player/atom';

const PlayerLanding = () => {
  const { voteId } = useParams<{ voteId: string }>();
  const { votingInfo, isLoading, isError } = useGetVotingInfo(voteId);

  const setVotingInfoState = useSetRecoilState(votingInfoState);
  const [stickerInfoState, setStickerInfoState] = useRecoilState(playerStickerInfoState);
  const resetVotingInfoState = useResetRecoilState(votingInfoState);
  const resetStickerInfoState = useResetRecoilState(playerStickerInfoState);

  useEffect(() => {
    resetVotingInfoState();
    resetStickerInfoState();
    if (votingInfo?.data) {
      setVotingInfoState({
        ...votingInfo?.data,
        isFlowerVoting: votingInfo.data.type === FLOWER_VOTING_TYPE,
      });
      setStickerInfoState({
        ...stickerInfoState,
        isFlowerVoting: votingInfo.data.type === FLOWER_VOTING_TYPE,
      });
    }
  }, [votingInfo]);

  if (isLoading) return <LandingPlayer />;
  if (isError) return <Error />;

  if (votingInfo?.status === 200 && votingInfo.data) return <VoteLanding />;
  return <FinishedLanding />;
};

export default PlayerLanding;
