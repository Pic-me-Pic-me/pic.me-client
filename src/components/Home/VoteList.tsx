import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcEmpty } from '../../asset/icon';
import useGetCurrentVoteList from '../../lib/hooks/useGetCurrentVoteList';
import useGetUserData from '../../lib/hooks/useGetUserData';
import Error404 from '../../pages/Error404';
import { stickerResultState } from '../../recoil/maker/atom';
import { VoteCardInfo } from '../../types/vote';
import { LandingVoteList } from '../Landing/maker';
import VoteCard from './VoteCard';

const VoteList = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [dataList, setDataList] = useState<VoteCardInfo[]>([]);
  // const [cursorId, setCursorId] = useState<string>('0');
  const cursorId = useRef<string>('0');
  const resetStickerInfoState = useResetRecoilState(stickerResultState);
  const { voteListResult, isLoading, isError } = useGetCurrentVoteList(cursorId.current);
  const { userInfo } = useGetUserData();

  const getMoreItem = useCallback(async () => {
    const voteListData = voteListResult;
    if (voteListData) {
      const newDataList = voteListData.result as VoteCardInfo[];
      setDataList(dataList.concat(newDataList));
      // setCursorId(voteListData.resCursorId);
      cursorId.current = voteListData.resCursorId;
    } else {
      return;
      // setIsEnd(true);
    }
  }, [cursorId]);

  useEffect(() => {
    resetStickerInfoState();
    console.log(cursorId);
    console.log(dataList?.length);
    if (!dataList?.length) {
      getMoreItem();
    }
  }, []);

  // 여기서 swr데이터 가져오는 걸로 하나더 useEffect 만들었어!
  useEffect(() => {
    console.log('SWR훅', voteListResult, dataList);
    if (!dataList.length && voteListResult) {
      const newDataList = voteListResult.result as VoteCardInfo[];
      setDataList([...dataList, ...newDataList]);
    }
  }, [voteListResult]);

  useEffect(() => {
    if (dataList?.length !== 0 && inView) {
      getMoreItem();
    }
  }, [inView]);

  if (isError) return <Error404 />;
  if (isLoading) return <LandingVoteList />;
  return (
    <>
      {dataList.length !== 0 ? (
        <>
          <StCurrentVote>현재 진행중인 투표</StCurrentVote>
          <StVoteListWrapper>
            {dataList?.map((data, i) => (
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
