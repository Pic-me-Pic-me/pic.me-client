import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { getAllVoteInfo } from '../lib/api/library';
import { EndedVoteInfo } from '../types/library';

const Library = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  // ref가 화면에 나타나면 inView는 true, 아니면 false를 반환한다.

  const [isEnd, setIsEnd] = useState(false);
  const nextIndex = useRef(0);
  const [data, setData] = useState<EndedVoteInfo[]>([]);

  useEffect(() => {
    getMoreItem();
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const getMoreItem = async () => {
    const prevLastDate = data[nextIndex.current] ? data[nextIndex.current].date : 0;

    const res = await getAllVoteInfo(prevLastDate);
    const getItem = res?.data.data as EndedVoteInfo[];

    if (data.length > 0 && getItem.length === 0) return setIsEnd(true);
    if (getItem) {
      const newData = [...data, ...getItem];
      nextIndex.current = newData.length - 1;
      setData(newData);
    }
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
