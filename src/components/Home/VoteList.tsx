import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';
import { getUserInfo } from '../../lib/api/auth';
import { getCurrentVoteData } from '../../lib/api/voting';
import useIntersectionObserver from '../../lib/hooks/useIntersectionObserver';
import { VoteInfo } from '../../types/voting';
import VoteCard from './VoteCard';

const VoteList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataList, setDataList] = useState<VoteInfo[]>();
  const [CursorId, setCursorId] = useState(0);
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    getMoreItem();
  }, [dataList]);

  const getUserName = async () => {
    const name = await getUserInfo();
    setUserName(name?.data.userName);
  };

  const getMoreItem = async () => {
    setIsLoaded(true);
    const newData = await getCurrentVoteData(Number(CursorId));

    if (!dataList) {
      setDataList(newData?.result);
    }
    if (newData) {
      if (dataList) {
        setDataList(dataList.concat(newData.result));
        setCursorId(newData.resCursorId);
        setIsLoaded(false);
      }
    }
  };

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <>
      <StCurrentVote>현재 진행중인 투표</StCurrentVote>
      {dataList ? (
        <StVoteListWrapper>
          {dataList?.map((data, i) => (
            <VoteCard voteData={data} key={i} />
          ))}
          <div ref={setTarget}>{isLoaded}</div>
        </StVoteListWrapper>
      ) : (
        <StEmptyView>
          <img src={EmptyIcon} alt="현재 진행중인 투표 없음" />
          <p>{userName}님 만의 투표를</p>
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
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
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

  > img {
    width: 13.8rem;
    height: 11rem;
    margin-bottom: 1.8rem;
  }
  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;
