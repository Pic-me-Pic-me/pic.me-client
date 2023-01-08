import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getLibraryInfo } from '../../lib/api/library';
import useIntersectionObserver from '../../lib/hooks/library';
import { EndedVoteInfo, VoteInfo } from '../../types/library';
import EndedVoting from './EndedVoting';

interface voteAllInfoProps {
  date: number;
  votes: VoteInfo[];
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { date, votes } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [nextFlag, setNextFlag] = useState(10);
  const [nextId, setNextId] = useState(10);
  const [data, setData] = useState();

  //현재 목업 데이터(CARD_DATA)를 사용하고 있기 때문에, 최대한 데이터를 재활용하는 코드를 작성.
  //(0~4번 게시물, 1~5번 게시물, 2~6번 게시물 이런 식으로 가져와서 5개씩 concat함수로 붙였다.)
  //getMoreItem 함수가 실행되면 isLoaded를 true로 만들어 로딩 컴포넌트를 보여주고,
  //함수가 종료될 때 isLoaded를 false로 만들어 로딩컴포넌트를 숨겼다.

  const getMoreItem = async () => {
    setIsLoaded(true);
    await getLibraryInfo(votes[4].id, date);
    console.log(nextFlag, nextId);
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
      await getMoreItem();
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
    <StMonthVotingWrapper>
      <StDateTitle>{voteAllInfo.date}</StDateTitle>
      <StEndedVotingListWrapper>
        {data.map((vote, idx) => (
          <EndedVoting voteData={vote} key={idx}></EndedVoting>
        ))}
        <div ref={setTarget}>{isLoaded && 'Loading'}</div>
      </StEndedVotingListWrapper>
    </StMonthVotingWrapper>
  );
};

const StMonthVotingWrapper = styled.article`
  margin-bottom: 4.906rem;
`;
const StDateTitle = styled.h2`
  margin-left: 2.2rem;

  color: #000000;
  ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22};
`;

const StEndedVotingListWrapper = styled.section`
  margin-left: 2rem;

  display: flex;

  margin-top: 1.7rem;

  gap: 1.521rem;

  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MonthVoting;
