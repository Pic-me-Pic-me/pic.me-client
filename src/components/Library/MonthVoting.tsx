import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { deleteVote, getMonthlyLibraryInfo } from '../../lib/api/library';
import { VoteInfo } from '../../types/library';
import EndedVoting from './EndedVoting';

interface voteAllInfoProps {
  date: number;
  votes: VoteInfo[];
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { date, votes } = props;
  const formattedDate = date.toString().substr(0, 4) + '. ' + date.toString().substr(4, 2);
  const nextIndex = useRef(votes.length - 1);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [verticalScrollInfo, setVerticalScrollInfo] = useState<VoteInfo[]>(votes);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    getMoreItem();
  }, [verticalScrollInfo]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
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
      return;
    }
  };

  const handleDeleteVote = async (id: number) => {
    const res = await deleteVote(id);
    setVerticalScrollInfo([...verticalScrollInfo.filter((info, idx) => info.id !== id)]);
  };

  return (
    <StMonthVotingWrapper>
      <StDateTitle>{verticalScrollInfo.length !== 0 && formattedDate}</StDateTitle>
      <StEndedVotingListWrapper>
        {verticalScrollInfo.map((vote: VoteInfo, idx: number) =>
          idx === verticalScrollInfo.length - 1 ? (
            <div key={idx} ref={ref}>
              <EndedVoting key={idx} id={vote.id} voteData={vote} handleDeleteVote={handleDeleteVote}></EndedVoting>
            </div>
          ) : (
            <div key={idx}>
              <EndedVoting
                id={vote.id}
                voteData={vote}
                key={idx}
                isStart={idx === 0 ? true : false}
                handleDeleteVote={handleDeleteVote}></EndedVoting>
            </div>
          ),
        )}
      </StEndedVotingListWrapper>
    </StMonthVotingWrapper>
  );
};

const StMonthVotingWrapper = styled.article`
  margin-bottom: 4.906rem;

  width: 100%;
`;

const StDateTitle = styled.h2`
  margin-left: 2.2rem;

  color: #000000;
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};
`;

const StEndedVotingListWrapper = styled.section`
  display: flex;
  gap: 1.521rem;

  width: 100%;
  margin-top: 1.7rem;
  margin-left: 5%;

  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  &:only-child {
    margin-left: 2rem;
  }
`;

export default MonthVoting;
