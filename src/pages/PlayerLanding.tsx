import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteStatus } from '../lib/api/playerLanding';

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState(false);

  const { voteId } = useParams<{ voteId: string }>();

  const voteStatus = async () => {
    if (voteId) {
      const data = await getVoteStatus(Number(voteId));
      if (data) {
        setIsFinished(data);
      }
    }
  };

  useEffect(() => {
    voteStatus();
  }, []);

  return <>{isFinished ? <VoteLanding /> : <FinishedLanding />}</>;
};

export default PlayerLanding;
