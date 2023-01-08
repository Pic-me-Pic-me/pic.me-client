import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteData } from '../lib/api/playerLanding';
import { VoteData } from '../types/vote';
import Error404 from './Error404';

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
      }
    }
  };

  if (vote?.status === 200) return <VoteLanding vote={vote?.data} />;
  if (vote?.status === 400) return <FinishedLanding vote={vote?.data} />;

  return <Error404 />;
};

export default PlayerLanding;
