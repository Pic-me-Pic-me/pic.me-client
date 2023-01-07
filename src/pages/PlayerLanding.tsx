import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteData } from '../lib/api/playerLanding';
import { VoteInfo } from '../types/vote';

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [vote, setVote] = useState<VoteInfo>();

  const { voteId } = useParams<{ voteId: string }>();

  useEffect(() => {
    voteStatus();
  }, []);

  const voteStatus = async () => {
    if (voteId) {
      const data = await getVoteData(Number(voteId));
      if (data) {
        setIsFinished(true);
        setVote(data.data);
        console.log(data.data);
      }
    }
  };
  return <>{vote ? isFinished ? <FinishedLanding vote={vote} /> : <VoteLanding vote={vote} /> : null}</>;
};

export default PlayerLanding;
