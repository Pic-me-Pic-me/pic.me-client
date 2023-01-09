import React from 'react';
import styled, { css } from 'styled-components';

import { VoteInfo } from '../../lib/api/voting';

interface VoteCardProps {
  voteData: VoteInfo;
}

const VoteCard = (props: VoteCardProps) => {
  const { voteData } = props;

  return (
    <StVoteItem>
      <StVoteData>
        <StTitleWrapper>
          <h1>{voteData.voteId}</h1>
          <h2>{voteData.totalVoteCount}명 투표 중</h2>
        </StTitleWrapper>
        <h3>{voteData.createdAt.toString()}</h3>
      </StVoteData>
      <StPreviewImg src={voteData.voteThumbnail} alt="투표 썸네일" />
    </StVoteItem>
  );
};

export default VoteCard;

const StVoteItem = styled.section`
  display: flex;

  width: 25.7rem;
  height: 15.4rem;
  margin-right: 1.6rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
`;

const StVoteData = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 10.3rem;
  padding: 1.3rem 1.6rem 1rem 1.4rem;

  border-radius: 1.2rem 0rem 0rem 1.2rem;

  > h3 {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  }
`;

const StTitleWrapper = styled.div`
  > h1 {
    padding-bottom: 0.7rem;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.9rem;
  }
  > h2 {
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    opacity: 0.5;
  }
`;

const StPreviewImg = styled.img`
  width: 15.4rem;

  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;
