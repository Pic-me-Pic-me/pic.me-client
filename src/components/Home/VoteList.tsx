import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';
import { getCurrentVoteData, VoteInfo } from '../../lib/api/voting';
import useIntersectionObserver from '../../lib/hooks/useIntersectionObserver';
import VoteCard from './VoteCard';

const VoteList = () => {
  const CARD_DATA: Array<VoteInfo> = [
    {
      voteId: 1,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 1,
    },
    {
      voteId: 2,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 2,
    },
    {
      voteId: 3,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 3,
    },
    {
      voteId: 4,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 4,
    },
    {
      voteId: 5,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 5,
    },
    {
      voteId: 6,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 6,
    },
    {
      voteId: 7,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 7,
    },
    {
      voteId: 8,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 8,
    },
    {
      voteId: 9,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 9,
    },
    {
      voteId: 10,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 10,
    },
    {
      voteId: 11,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 11,
    },
    {
      voteId: 12,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 12,
    },
    {
      voteId: 13,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 13,
    },
    {
      voteId: 14,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 14,
    },
    {
      voteId: 15,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 15,
    },
    {
      voteId: 16,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 16,
    },
    {
      voteId: 17,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 17,
    },
    {
      voteId: 18,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 18,
    },
    {
      voteId: 19,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 19,
    },
    {
      voteId: 20,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 20,
    },
    {
      voteId: 21,
      title: '제목제목제목제목',
      voteThumbnail: '주소주소',
      createdAt: new Date('1995-12-17T03:24:00'),
      totalVoteCount: 21,
    },
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [dataList, setDataList] = useState<VoteInfo[]>(CARD_DATA.slice(0, 5));
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
        setDataList(newDataList);
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
  padding: 0rem 2rem;
  margin: 5.1rem 0rem 1.3rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
`;

const StVoteListWrapper = styled.main`
  display: flex;
  overflow-x: scroll;

  overflow-y: hidden;
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
