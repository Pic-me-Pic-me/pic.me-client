import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { HeaderLayout } from '../components/Layout';
import MonthVoting from '../components/Library/MonthVoting';
import { getAllVoteInfo, getLibraryInfo } from '../lib/api/library';
import useIntersectionObserver from '../lib/hooks/library';
import { firstVerticalScrollInfo } from '../recoil/maker/atom';
import { EndedVoteInfo, VoteInfo } from '../types/library';

const Library = () => {
  const navigate = useNavigate();

  const [monthVotingData, setMonthVotingData] = useState<Array<VoteInfo>>([]);

  //첫 요청시
  //세로에서 받아온 데이터의 마지막 date
  //마지막 date의 votes의 마지막 요소의 id
  const [firstVerticalInfo, setFirstVerticalInfo] = useRecoilState(firstVerticalScrollInfo);

  // useEffect() () => {
  //   const res = await getAllVoteInfo(0);
  // }, []);

  const [isLoaded, setIsLoaded] = useState(false);
  const [nextItem, setNextItem] = useState(0);

  const getMoreMonthVote = async () => {
    setIsLoaded(true);
    const res = await getAllVoteInfo(nextItem);
    setNextItem(res?.data.data.date);

    const getItem = res?.data.data.votes;

    getItem.forEach((item: VoteInfo) => {
      monthVotingData.push(item);
    });

    setMonthVotingData(monthVotingData);

    setNextItem(res?.data.data[2].date);
    console.log(res, nextItem);
    setIsLoaded(false);
  };

  //intersection 콜백함수
  //entry는 IntersectionObserverEntry 인스턴스의 배열
  //isIntersecting: 대상 객체와 루트 영역의 교차상태를 boolean값으로 나타냄
  //대상 객체가 루트 영역과 교차 상태로 들어갈 때(true), 나갈 때(false)

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreMonthVote();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <>
      <HeaderLayout
        HeaderTitle="라이브러리"
        handleGoback={() => {
          navigate(-1);
        }}
      />

      <StMonthVotingInfo>
        {monthVotingData.map((votingInfo, idx) => (
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
