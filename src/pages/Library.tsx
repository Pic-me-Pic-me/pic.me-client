import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { getAllVoteInfo } from '../lib/api/library';
import useIntersectionObserver from '../lib/hooks/library';
import { EndedVoteInfo, VoteInfo } from '../types/library';

const Library = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const nextIndex = useRef(0);
  const [data, setData] = useState<EndedVoteInfo[]>([]);

  useEffect(() => {
    getMoreItem();
  }, []);
  useEffect(() => {
    console.log(inView);
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const getMoreItem = async () => {
    setIsLoaded(true);

    console.log('getMore', nextIndex.current);
    const prevLastDate = data[nextIndex.current] ? data[nextIndex.current].date : 0;

    const res = await getAllVoteInfo(prevLastDate);
    const getItem = res?.data.data as EndedVoteInfo[];

    console.log('현재', data, getItem);
    if (data.length > 0 && getItem.length === 0) return setIsEnd(true);
    const newData = [...data, ...getItem];
    nextIndex.current = newData.length - 1;
    setData(newData);
    setIsLoaded(false);
  };
  return (
    <>
      <HeaderLayout
        HeaderTitle="라이브러리"
        handleGoback={() => {
          navigate(-1);
        }}
      />

      <StMonthVotingInfo>
        {data.map((votingInfo: EndedVoteInfo, idx: number) =>
          idx === data.length - 1 ? (
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

  margin-top: 3.3rem;

  overflow-y: scroll;
`;

export default Library;
