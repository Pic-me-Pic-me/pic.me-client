import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import VoteSlider from '../components/Home/CurrentVote/VoteSlider';
import VoteInfo from '../components/Home/CurrentVote/VoteStatus';
import { HeaderLayout } from '../components/Layout';
import { getCurrentVoteData, patchCurrentVoteData } from '../lib/api/voting';
import { PictureProps, StickerProps, VoteInfoProps } from '../types/voting';

const CurrentVote = () => {
  const { voteid } = useParams<{ voteid: string }>();
  const navigate = useNavigate();

  const [voteInfo, setVoteInfo] = useState<VoteInfoProps>();

  const HandleGetCurrentVoteData = async () => {
    const data = await getCurrentVoteData(voteid);
    setVoteInfo(data);
  };

  useEffect(() => {
    HandleGetCurrentVoteData();
  }, []);

  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={() => navigate('/')} />
      <VoteInfo {...voteInfo} />
      {/* <VoteSlider {...voteInfo} /> */}
    </>
  );
};

export default CurrentVote;
