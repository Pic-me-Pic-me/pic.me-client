import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

import { deleteVote } from '../../lib/api/library';
import { useGetMonthlyLibraryInfo } from '../../lib/hooks/useGetMonthlyLibraryInfo';
import Error404 from '../../pages/Error404';
import { VoteInfo } from '../../types/library';
import LandingLibrary from '../Landing/maker/LandingLibrary';
import EndedVoting from './EndedVoting';

interface voteAllInfoProps {
  date: number;
  votes: VoteInfo[];
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { date, votes } = props;
  const formattedDate = date.toString().slice(0, 4) + '. ' + date.toString().slice(4, 6);
  const nextIndex = useRef(votes.length - 1);
  const [verticalScrollInfo, setVerticalScrollInfo] = useState<VoteInfo[]>(votes);
  const { monthlyVoteInfo, isLoading, isError } = useGetMonthlyLibraryInfo(
    verticalScrollInfo[nextIndex.current] ? verticalScrollInfo[nextIndex.current].id : '0',
    date,
  );

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    getMoreItem();
  }, [verticalScrollInfo]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const getMoreItem = async () => {
    const getItem = monthlyVoteInfo;

    if (getItem?.length) {
      const newData = [...verticalScrollInfo, ...getItem];
      nextIndex.current = newData.length - 1;
      setVerticalScrollInfo(newData);
    } else {
      return;
    }
  };

  const handleDeleteVote = async (id: string) => {
    await deleteVote(id);
    setVerticalScrollInfo([...verticalScrollInfo.filter((info, idx) => info.id !== id)]);
  };

  if (isLoading) {
    return <LandingLibrary />;
  }

  if (isError) {
    return <Error404 />;
  }

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
            <EndedVoting id={vote.id} voteData={vote} key={idx} handleDeleteVote={handleDeleteVote}></EndedVoting>
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

  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MonthVoting;
