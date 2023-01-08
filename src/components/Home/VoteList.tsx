import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';
import { getCurrentVoteData, VoteInfo } from '../../lib/api/voting';
import useIntersectionObserver from '../../lib/hooks/useIntersectionObserver';
import VoteCard from './VoteCard';

const VoteList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [dataList, setDataList] = useState<VoteInfo[]>([]);
  const [newDataList, setnewDataList] = useState<VoteInfo[]>(dataList);

  useEffect(() => {
    getMoreItem();
  }, []);

  const getMoreItem = async () => {
    setIsLoaded(true);
    const newData = await getCurrentVoteData();

    if (newData) {
      newData.forEach((data) => {
        newDataList.push(data);
        setItemIndex((i) => i + 1);
        setDataList(newData);
        setIsLoaded(false);
      });
    }
    console.log(dataList);
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
          <div ref={setTarget}>{isLoaded && 'Loading'}</div>
        </StVoteListWrapper>
      ) : (
        <StEmptyView>
          <img src={EmptyIcon} alt="현재 진행중인 투표 없음" />
          <p>픽둥이님 만의 투표를</p>
          <p>만들어보세요!</p>
        </StEmptyView>
      )}
    </>
  );
};

export default VoteList;

const StCurrentVote = styled.h1`
  margin: 5.1rem 0rem 1.3rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
`;

const StVoteListWrapper = styled.main`
  display: flex;
  overflow-x: scroll;

  height: 15.4rem;

  cursor: pointer;
`;

const StEmptyView = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5.1rem;

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
