import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteStatus } from '../lib/api/playerLanding';
import { VoteInfo } from '../types/vote';

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [vote, setVote] = useState<VoteInfo>();

  const { voteId } = useParams<{ voteId: string }>();

  const voteStatus = async () => {
    if (voteId) {
      const data = await getVoteStatus(Number(voteId));
      console.log(data);
      if (data) {
        setIsFinished(true);
        setVote(data);
      }
    }
  };

  useEffect(() => {
    voteStatus();
  }, []);

  return vote ? isFinished ? <FinishedLanding vote={vote} /> : <VoteLanding vote={vote} /> : null;
};

export default PlayerLanding;
