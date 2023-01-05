import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { EndedVoteInfo } from '../../types/library';
import EndedVoting from './EndedVoting';

interface voteAllInfoProps {
  voteAllInfo: EndedVoteInfo;
}

const useIntersectionObserver = ({ root, rootMargin, threshold, onIntersect }: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  //감지할 대상 객체는 계속해서 바뀌는데, useRef는 참조값의 변경사항을 알리지 않아 useEffect가 트리거(발생)되지 않는다.
  //callback ref를 사용하거나 setState로 역할을 위임하는 방법이 있고, 이 코드는 후자를 선택했다.

  //observer 등록
  //target이라는 상태값이 있으면 IntersectionObserver를 생성하여 observer에 담음
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
    //observer 관찰 시작
    observer.observe(target);

    //observer 관찰 종료
    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
  //target을 변경할 수 있도록 setTarget을 넘겨줌
};

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const MonthVoting = (props: voteAllInfoProps) => {
  const { voteAllInfo } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState(voteAllInfo.votes.slice(0, 10));

  //로딩 테스트를 위해서 가짜 fetch 함수를 넣었다.
  const testFetch = (delay = 1000) => new Promise((res) => setTimeout(res, delay));
  //현재 목업 데이터(CARD_DATA)를 사용하고 있기 때문에, 최대한 데이터를 재활용하는 코드를 작성.
  //(0~4번 게시물, 1~5번 게시물, 2~6번 게시물 이런 식으로 가져와서 5개씩 concat함수로 붙였다.)
  //getMoreItem 함수가 실행되면 isLoaded를 true로 만들어 로딩 컴포넌트를 보여주고,
  //함수가 종료될 때 isLoaded를 false로 만들어 로딩컴포넌트를 숨겼다.
  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex((i) => i + 1);
    setData(data?.concat(voteAllInfo.votes?.slice(itemIndex, itemIndex + 5)));
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

  return (
    <>
      <StDateTitle>{voteAllInfo.date}</StDateTitle>
      <StEndedVotingListWrapper>
        {voteAllInfo.votes.map((vote, idx) => (
          <EndedVoting voteData={vote} key={idx}></EndedVoting>
        ))}
        <div ref={setTarget}>{isLoaded && 'Loading'}</div>
      </StEndedVotingListWrapper>
    </>
  );
};

const StDateTitle = styled.h2`
  margin-left: 2.2rem;

  color: #000000;
  ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22};
`;

const StEndedVotingListWrapper = styled.section`
  margin-left: 2rem;

  display: flex;

  margin-top: 1.7rem;

  gap: 1.521rem;

  overflow-x: scroll;
`;

export default MonthVoting;
