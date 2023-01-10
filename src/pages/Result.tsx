import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import resultSample from '../asset/image/resultSample.png';
import { Error, Loading } from '../components/common';
import { HeaderLayout } from '../components/Layout';
import ResultPicture from '../components/Result/ResultPicture';
import ResultReason from '../components/Result/ResultReason';
import SliderTitle from '../components/Result/SliderTitle';
import useGetVoteResult from '../lib/hooks/useGetVoteResult';

export const Result = () => {
  const navigate = useNavigate();
  const { voteId } = useParams() as { voteId: string };
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);

  if (isLoading) <Loading />;
  if (isError) <Error />;

  if (voteResult)
    return (
      <>
        <HeaderLayout HeaderTitle="최종 투표 결과" handleGoback={() => navigate(-1)}></HeaderLayout>
        <SliderTitle
          isChosenPic={false}
          voteTitle={voteResult.voteTitle}
          voteTotalNumber={voteResult.currentVote}></SliderTitle>
        <ResultPicture src={voteResult.Picture[1].url}></ResultPicture>
        {/* <ResultReason totalVote={voteResult.currentVote} bestReasonVote={}></ResultReason> */}
      </>
    );
  return <Error />;
};
