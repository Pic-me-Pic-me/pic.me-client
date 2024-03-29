import React, { useCallback, useEffect } from 'react';
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
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { date } = props;
  const formattedDate = date ? date.toString().slice(0, 4) + '. ' + date.toString().slice(4, 6) : ' ';

  const { monthlyVoteInfoList, isLoading, isError, size, setSize, mutate } = useGetMonthlyLibraryInfo(date);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const getMoreItem = useCallback(async () => {
    if (monthlyVoteInfoList) {
      setSize((prev) => prev + 1);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
      console.log(monthlyVoteInfoList);
    }
  }, [inView]);

  const handleDeleteVote = async (id: string) => {
    await deleteVote(id);
    return mutate();
  };

  if (isLoading) {
    return <LandingLibrary />;
  }

  if (isError) {
    return <Error404 />;
  }

  if (isLoading) {
    return <LandingLibrary />;
  }

  if (isError) {
    return <Error404 />;
  }

  return (
    <StMonthVotingWrapper>
      <StDateTitle>{monthlyVoteInfoList.list.length !== 0 && formattedDate}</StDateTitle>
      <StEndedVotingListWrapper>
        {monthlyVoteInfoList.list.map((vote: VoteInfo, idx: number) =>
          idx === monthlyVoteInfoList.list.length - 1 ? (
            <div key={idx} ref={ref}>
              <EndedVoting
                id={vote.id}
                voteData={vote}
                handleDeleteVote={handleDeleteVote}
                voteType={vote.type}></EndedVoting>
            </div>
          ) : (
            <EndedVoting
              id={vote.id}
              voteData={vote}
              key={idx}
              handleDeleteVote={handleDeleteVote}
              voteType={vote.type}></EndedVoting>
          ),
        )}
      </StEndedVotingListWrapper>
    </StMonthVotingWrapper>
  );
};

const StMonthVotingWrapper = styled.article`
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
  padding-left: 2rem;

  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MonthVoting;
