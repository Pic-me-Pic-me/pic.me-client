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
      // newData?.map((datas, i)=>(
      // newDataList.push(datas);
      // newDataList = (dataList.
      // setItemIndex((i) => i + 1);
      // ));
      // setDataList([...dataList, newData]);
    }
    console.log(newData);
    setIsLoaded(false);
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
      {dataList ? (
        <StVoteListWrapper>
          <h1>현재 진행중인 투표</h1>
          {dataList?.map((data, i) => (
            <VoteCard voteData={data} key={i} />
          ))}
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

const StVoteListWrapper = styled.main`
  margin-left: 2.1rem;
  margin-top: 5.1rem;

  cursor: pointer;

  > h1 {
    margin: 0rem 0rem 1.3rem 0rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
  }
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
