import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import MonthVoting from '../components/Library/MonthVoting';
import { getLibraryInfo } from '../lib/api/library';
import { EndedVoteInfo } from '../types/library';

const Library = () => {
  const [endedVotingData, setEndedVotingData] = useState<Array<EndedVoteInfo>>();

  useEffect(() => {
    getLibraryInfo().then((result) => {
      if (result?.data.status === 200) {
        setEndedVotingData(result.data.data);
      }
    });
  });

  return (
    <>
      <StMonthVotingInfo>
        {endedVotingData?.map((votingInfo, idx) => (
          <MonthVoting voteAllInfo={votingInfo} key={idx}></MonthVoting>
        ))}
      </StMonthVotingInfo>
    </>
  );
};

const StMonthVotingInfo = styled.article`
  display: flex;
  flex-direction: column;

  gap: 4.906rem;
`;

export default Library;
