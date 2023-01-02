import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Error, Loading } from '../components/common';
import { Header } from '../components/Voting';
import { useGetVotingInfo } from '../lib/hooks/voting';
import { votingStateSelector } from '../recoil/player/selector';

const Voting = () => {
  const { votingInfo, isLoading, isError } = useGetVotingInfo(1);
  const [newVotingInfo, setNewVotingInfo] = useRecoilState(votingStateSelector);
  useEffect(() => {
    if (votingInfo) {
      setNewVotingInfo(votingInfo.data);
    }
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div>
      <p>{newVotingInfo.vote_title}</p>
      <Header />
      <StName>Happee의 사진을 골라죠💛</StName>
    </div>
  );
};
export default Voting;

const StName = styled.p`
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20}
`;
