import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';
import { getCurrentVoteData, VoteListInfo } from '../../lib/api/voting';
import useIntersectionObserver from '../../lib/hooks/useIntersectionObserver';
import VoteCard from './VoteCard';

const VoteList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState<VoteListInfo[]>();

  useEffect(() => {
    console.log('ddd');
    getCurrentVoteData();
  }, []);

  //로딩 테스트를 위해서 가짜 fetch 함수를 넣었다.
  // const getCurrentVoteData = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

  //현재 목업 데이터(CARD_DATA)를 사용하고 있기 때문에, 최대한 데이터를 재활용하는 코드를 작성.
  //(0~4번 게시물, 1~5번 게시물, 2~6번 게시물 이런 식으로 가져와서 5개씩 concat함수로 붙였다.)
  //getMoreItem 함수가 실행되면 isLoaded를 true로 만들어 로딩 컴포넌트를 보여주고,
  //함수가 종료될 때 isLoaded를 false로 만들어 로딩컴포넌트를 숨겼다.
  const getMoreItem = async () => {
    setIsLoaded(true);
    // const newData: VoteListInfo = await getCurrentVoteData();
    setItemIndex((i) => i + 1);
    // setData(newData, ...data);
    setIsLoaded(false);
  };

  //intersection 콜백함수
  //entry는 IntersectionObserverEntry 인스턴스의 배열
  //isIntersecting: 대상 객체와 루트 영역의 교차상태를 boolean값으로 나타냄
  //대상 객체가 루트 영역과 교차 상태로 들어갈 때(true), 나갈 때(false)

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  const [voteList, setVoteList] = useState<string[]>(['투표']);
  return (
    <>
      {voteList ? (
        <StVoteListWrapper>
          <h1>현재 진행중인 투표</h1>
          <VoteCard />
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
