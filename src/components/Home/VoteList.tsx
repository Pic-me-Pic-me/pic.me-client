import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcEmpty } from '../../asset/icon';
import useGetCurrentVoteList from '../../lib/hooks/useGetCurrentVoteList';
import useGetUserData from '../../lib/hooks/useGetUserData';
import Error404 from '../../pages/Error404';
import { stickerResultState } from '../../recoil/maker/atom';
import { LandingVoteList } from '../Landing/maker';
import VoteCard from './VoteCard';

const VoteList = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const resetStickerInfoState = useResetRecoilState(stickerResultState);
  const { voteListResult, isLoading, isError, size, setSize } = useGetCurrentVoteList();
  const { userInfo } = useGetUserData();

  const getMoreItem = useCallback(async () => {
    if (voteListResult) {
      setSize((prev) => prev + 1);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    resetStickerInfoState();
  }, []);

  useEffect(() => {
    if (inView && voteListResult.result) {
      getMoreItem();
    }
  }, [inView]);

  if (isError) return <Error404 />;
  if (isLoading) return <LandingVoteList />;
  return (
    <>
      {voteListResult.result.length !== 0 ? (
        <>
          <StCurrentVote>현재 진행중인 투표</StCurrentVote>
          <StVoteListWrapper>
            {voteListResult.result?.map((data, i) => (
              <VoteCard voteData={data} key={i} />
            ))}
            <div ref={ref} />
          </StVoteListWrapper>
        </>
      ) : (
        <StEmptyView>
          <IcEmpty />
          <p>{userInfo?.userName}님 만의 투표를</p>
          <p>만들어보세요!</p>
        </StEmptyView>
      )}
    </>
  );
};

export default VoteList;

const StCurrentVote = styled.h1`
  padding: 0rem 2rem;
  margin: 5.1rem 0rem 1.3rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};
`;

const StVoteListWrapper = styled.main`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  padding-bottom: 19.3rem;
  height: 15.4rem;

  cursor: pointer;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StEmptyView = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5.1rem;
  padding-bottom: 19.3rem;

  > svg {
    width: 13.8rem;
    height: 11rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;
