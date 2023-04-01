import React, { useCallback, useEffect } from 'react';
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

  const getMoreItem = useCallback(() => {
    if (voteListResult && voteListResult.result) {
      setSize((prev) => prev + 1);
    }
  }, [voteListResult, setSize]);

  useEffect(() => {
    resetStickerInfoState();
  }, []);

  useEffect(() => {
    if (inView && voteListResult?.result) {
      getMoreItem();
    }
  }, [inView, voteListResult, getMoreItem]);

  if (isError) return <Error404 />;
  if (isLoading) return <LandingVoteList />;

  return (
    <>
      <StCurrentVote>현재 진행중인 투표</StCurrentVote>
      {voteListResult?.result?.length ? (
        <StVoteListWrapper>
          {voteListResult.result.map((data, i) => (
            <VoteCard voteData={data} key={i} />
          ))}
          <div ref={ref} />
        </StVoteListWrapper>
      ) : (
        <StEmptyView>
          <IcEmpty />
          <p>{userInfo?.userName}님만의</p>
          <p>투표를 만들어보세요!</p>
        </StEmptyView>
      )}
    </>
  );
};

export default VoteList;

const StCurrentVote = styled.h1`
  padding: 0rem 2rem;
  margin: 2.168rem 0rem 1.3rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Noto_SB_Title_2};
`;

const StVoteListWrapper = styled.main`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  margin-bottom: 19.3rem;
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

  margin: 3rem 0rem 19.3rem 0rem;

  > svg {
    width: 6.178rem;
    height: 4.919rem;
    margin-bottom: 0.9rem;
  }
  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_1};
  }
`;
