import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { StickerProps, VoteInfoProps } from '../../types/voting';

const VoteInfo = (voteInfo: VoteInfoProps) => {
  const { voteId, voteStatus, voteTitle, createDate } = voteInfo;

  return (
    <StVoteInfo>
      <span>42분 전</span>
      <h1>{voteTitle}</h1>
    </StVoteInfo>
  );
};

export default VoteInfo;

const StVoteInfo = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  }

  & > h1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin-top: 0.8rem;

    width: 34.6rem;
    height: 5.6rem;

    ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
  }
`;
