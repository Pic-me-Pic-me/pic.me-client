import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { getLibraryInfo } from '../lib/api/library';
import { EndedVoteInfo } from '../types/library';

const Library = () => {
  const navigate = useNavigate();
  const data: Array<EndedVoteInfo> = [
    {
      date: '202212',
      votes: [
        { title: '얘들아 뭐고르지1', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지2', count: 2, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지3', count: 3, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지4', count: 4, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지5', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지6', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지7', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지8', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지9', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지10', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지11', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지12', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지13', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지14', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지15', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지16', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지17', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지18', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지19', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지20', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지21', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지22', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지23', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지24', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
      ],
    },
    {
      date: '202212',
      votes: [
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 2, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 3, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 4, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지344', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
      ],
    },
    {
      date: '202212',
      votes: [
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 2, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 3, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 4, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
        { title: '얘들아 뭐고르지', count: 1, createAt: '1월 3일', url: 'dhjfhjsd' },
      ],
    },
  ];
  const [endedVotingData, setEndedVotingData] = useState<Array<EndedVoteInfo>>(data);

  return (
    <>
      <HeaderLayout
        HeaderTitle="라이브러리"
        handleGoback={() => {
          navigate(-1);
        }}
      />

      <StMonthVotingInfo>
        {endedVotingData.map((votingInfo, idx) => (
          <MonthVoting voteAllInfo={votingInfo} key={idx}></MonthVoting>
        ))}
      </StMonthVotingInfo>
    </>
  );
};

const StMonthVotingInfo = styled.article`
  display: flex;
  flex-direction: column;

  margin-top: 3.3rem;

  overflow: auto;
`;

export default Library;
