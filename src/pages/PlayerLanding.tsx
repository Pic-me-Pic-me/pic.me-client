import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FinishedLanding, VoteLanding } from '../components/Landing';
import { getVoteStatus } from '../lib/api/playerLanding';

export interface VoteInfo {
  //   username: string;
  vote_id: number;
  vote_status: boolean;
  vote_title: string;
  Picture: PictureData[];
}

export interface PictureData {
  picture_id: number;
  url: string;
}

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [vote, setVote] = useState<VoteInfo>();
  // const [currentVoteTitle, setCurrentVoteTitle] = useState<string>();

  const { voteId } = useParams<{ voteId: string }>();

  const voteStatus = async () => {
    if (voteId) {
      const data = await getVoteStatus(Number(voteId));
      if (data) {
        setIsFinished(true);
        setVote(data);
        console.log(test);
        // setCurrentVoteTitle(data.voteTitle);
      }
    }
  };

  useEffect(() => {
    voteStatus();
  }, []);

  return isFinished ? vote ? <VoteLanding vote={vote} /> : null : <FinishedLanding />;
};

export default PlayerLanding;
