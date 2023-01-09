import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getMonthlyLibraryInfo } from '../../lib/api/library';
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

  const [nextIndex, setNextIndex] = useState(votes[4].id);
  const [verticalScrollInfo, setVerticalScrollInfo] = useState<VoteInfo[]>([]);

  useEffect(() => {
    const getMoreItem = async () => {
      setIsLoaded(true);
      const res = await getMonthlyLibraryInfo(nextIndex, date);
      if (res?.data.data) {
        const newVerticalScrollInfo = res.data.data as VoteInfo[];
        setVerticalScrollInfo(newVerticalScrollInfo);

        if (newVerticalScrollInfo[4]) setNextIndex(newVerticalScrollInfo[4].id);
        setIsLoaded(false);
      }
      // setVerticalScrollInfo(verticalScrollInfo.slice(nextIndex, nextIndex + 5));
      // setNextIndex(res?.data.data[4].date);
    };
    getMoreItem();
  }, []);

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      // await getMoreItem();
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
      <StDateTitle>{date}</StDateTitle>
      <StEndedVotingListWrapper>
        {verticalScrollInfo.map((vote: VoteInfo, idx: number) => (
          <EndedVoting id={vote.id} voteData={vote} key={idx}></EndedVoting>
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
