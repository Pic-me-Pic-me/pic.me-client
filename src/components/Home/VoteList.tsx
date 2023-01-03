import React, { useState } from 'react';
import styled from 'styled-components';

import { EmptyIcon } from '../../asset/image';

const VoteList = () => {
  const [voteList, setVoteList] = useState<string[]>(['투표']);
  return (
    <>
      {voteList ? (
        <StVoteListWrapper>
          <h1>현재 진행중인 투표</h1>
          <StVoteList>
            <StVoteItem>
              <StVoteData>
                <h1>어제 연남동 가서 찍은...</h1>
                <h2>15명 투표 중</h2>
                <h3>43분 전</h3>
              </StVoteData>
              <StPreviewImg />
            </StVoteItem>
            <StVoteItem>
              <StVoteData>
                <h1>어제 연남동 가서 찍은...</h1>
                <h2>15명 투표 중</h2>
                <h3>43분 전</h3>
              </StVoteData>
              <StPreviewImg />
            </StVoteItem>
          </StVoteList>
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

  > h1 {
    margin: 0rem 0rem 1.3rem 0rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
  }
`;

const StVoteList = styled.main`
  display: flex;
`;
const StVoteItem = styled.section`
  display: flex;

  width: 25.7rem;
  height: 15.4rem;
  margin-right: 1.6rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
`;

const StVoteData = styled.article`
  width: 10.3rem;
  border-radius: 1.2rem 0rem 0rem 1.2rem;

  > h1 {
    padding: 1.3rem 1.6rem 0.7rem 1.4rem;

    color: ${({ theme }) => theme.colors.Pic_Color_White};
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
  }
  > h2 {
    padding: 0rem 1.6rem 5.8rem 1.4rem;

    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    opacity: 0.5;
  }
  > h3 {
    padding: 0rem 1.6rem 0rem 1.4rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  }
`;

const StPreviewImg = styled.div`
  width: 15.4rem;

  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
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
