import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

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
    </div>
  );
};
export default Voting;
