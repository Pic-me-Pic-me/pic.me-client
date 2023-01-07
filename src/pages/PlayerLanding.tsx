import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteData } from '../lib/api/playerLanding';
import { VoteData } from '../types/vote';

const PlayerLanding = () => {
  const [vote, setVote] = useState<VoteData>();

  const { voteId } = useParams<{ voteId: string }>();

  useEffect(() => {
    voteStatus();
  }, []);

  const voteStatus = async () => {
    if (voteId) {
      const data = await getVoteData(Number(voteId));
      if (data) {
        setVote(data);
        console.log(data);
      }
    }
  };

  return vote?.status === 400 ? <FinishedLanding vote={vote.data} /> : <VoteLanding vote={vote?.data} />;
};

export default PlayerLanding;
