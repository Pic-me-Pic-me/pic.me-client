import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { getMonthlyLibraryInfo } from '../../lib/api/library';
import { VoteInfo } from '../../types/library';
import EndedVoting from './EndedVoting';

interface voteAllInfoProps {
  date: number;
  votes: VoteInfo[];
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { date, votes } = props;
  const nextIndex = useRef(votes.length - 1);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [verticalScrollInfo, setVerticalScrollInfo] = useState<VoteInfo[]>(votes);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (inView) {
      getMoreItem();
      console.log('불러오니?');
    }
  }, [inView]);

  const getMoreItem = async () => {
    const prevLastId = verticalScrollInfo[nextIndex.current] ? verticalScrollInfo[nextIndex.current].id : 0;

    const res = await getMonthlyLibraryInfo(prevLastId, date);

    const getItem = res?.data.data as VoteInfo[];

    if (getItem.length) {
      const newData = [...verticalScrollInfo, ...getItem];
      nextIndex.current = newData.length - 1;
      setVerticalScrollInfo(newData);
    } else {
      setIsEnd(true);
      console.log(isEnd);
      return;
    }
  };

  return (
    <StMonthVotingWrapper>
      <StDateTitle>{date}</StDateTitle>
      <StEndedVotingListWrapper>
        {verticalScrollInfo.map((vote: VoteInfo, idx: number) =>
          idx === verticalScrollInfo.length - 1 ? (
            <div key={idx} ref={ref}>
              <EndedVoting id={vote.id} voteData={vote} key={idx}></EndedVoting>
            </div>
          ) : (
            <EndedVoting id={vote.id} voteData={vote} key={idx} isStart={idx === 0 ? true : false}></EndedVoting>
          ),
        )}
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
  display: flex;
  gap: 1.521rem;

  width: 100%;
  margin-top: 1.7rem;

  overflow-x: scroll;

  section:first-child {
    margin-left: 2rem;
  }

  section:last-child {
    margin-left: 0;

    margin-right: 2rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MonthVoting;
