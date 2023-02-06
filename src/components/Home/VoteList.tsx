import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcEmpty } from '../../asset/icon';
import { getUserInfo } from '../../lib/api/auth';
import { getCurrentVoteData } from '../../lib/api/voting';
import { stickerResultState } from '../../recoil/maker/atom';
import { VoteCardInfo } from '../../types/vote';
import { LandingVoteList } from '../Landing/maker';
import VoteCard from './VoteCard';

const VoteList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [dataList, setDataList] = useState<VoteCardInfo[]>([]);
  const [cursorId, setCursorId] = useState(0);
  const [userName, setUserName] = useState<string>();
  const resetStickerInfoState = useResetRecoilState(stickerResultState);
  const [isEnd, setIsEnd] = useState(false);

  const getMoreItem = useCallback(async () => {
    const newData = await getCurrentVoteData(cursorId);
    console.log(newData);

    if (newData?.data) {
      const newDataList = newData.data.result as VoteCardInfo[];
      setDataList(dataList.concat(newDataList));
      setCursorId(newData.data.resCursorId);
    } else {
      setIsEnd(true);
    }
  }, [cursorId]);

  useEffect(() => {
    getUserName();
    resetStickerInfoState();

    if (dataList?.length === 0) {
      getMoreItem();
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (dataList?.length !== 0 && inView && !isEnd) {
      getMoreItem();
    }
    setIsLoading(false);
  }, [inView]);

  const getUserName = async () => {
    const { data: name } = await getUserInfo();
    setUserName(name?.userName);
  };

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
