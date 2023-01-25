import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LandingLibrary from '../components/Landing/maker/LandingLibrary';
import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { useGetAllVoteInfo } from '../lib/hooks/useGetAllVoteInfo';
import { EndedVoteInfo } from '../types/library';
import Error404 from './Error404';

const Library = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  // ref가 화면에 나타나면 inView는 true, 아니면 false를 반환한다.

  const [isEnd, setIsEnd] = useState(false);
  const nextIndex = useRef(0);
  const [monthVoteData, setMonthVoteData] = useState<EndedVoteInfo[]>([]);
  const { allVoteInfo, isLoading, isError } = useGetAllVoteInfo(
    monthVoteData[nextIndex.current] ? monthVoteData[nextIndex.current].date : 0,
  );

  useEffect(() => {
    getMoreItem();
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const getMoreItem = () => {
    const getItem = allVoteInfo;

    if (monthVoteData.length > 0 && getItem?.length === 0) return setIsEnd(true);
    if (getItem) {
      const newData = [...monthVoteData, ...getItem];
      nextIndex.current = newData.length - 1;
      setMonthVoteData(newData);
    }
  };

  if (isLoading) {
    return <LandingLibrary />;
  }

  if (isError) {
    return <Error404 />;
  }

  return (
    <>
      <HeaderLayout
        HeaderTitle="라이브러리"
        handleGoback={() => {
          navigate('/home');
        }}
      />

      <StMonthVotingInfo>
        {monthVoteData.map((votingInfo: EndedVoteInfo, idx: number) =>
          idx === monthVoteData.length - 1 ? (
            <div key={idx} ref={ref}>
              <MonthVoting date={votingInfo.date} votes={votingInfo.votes} key={idx}></MonthVoting>
            </div>
          ) : (
            <MonthVoting date={votingInfo.date} votes={votingInfo.votes} key={idx}></MonthVoting>
          ),
        )}
      </StMonthVotingInfo>
    </>
  );
};

const StMonthVotingInfo = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 3.3rem;

  overflow-y: scroll;
`;

export default Library;
