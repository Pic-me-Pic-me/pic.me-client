import React from 'react';
import styled from 'styled-components';

import { IcDelete } from '../../asset/icon';

interface iVotingProps {
  number: number;
}

const EndedVoting = (props: iVotingProps) => {
  const { number } = props;
  return (
    <>
      <StVotingWrapper>
        <StVotingPic />
        <StDeleteBtnWrapper type="button">
          <IcDelete />
        </StDeleteBtnWrapper>
        <StVotingDesc>
          <StVotingTitle>얘들아 와다 예쁘다 {number}</StVotingTitle>
          <StVotingDate>1월 3일 </StVotingDate>
          <StVotingPeopleNum>15명 투표 중</StVotingPeopleNum>
        </StVotingDesc>
      </StVotingWrapper>
    </>
  );
};

const StVotingWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const StVotingPic = styled.img`
  position: relative;
  width: 17.6rem;
  height: 12.8rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  border-radius: 1.141rem 1.141rem 0rem 0rem;
`;

const StDeleteBtnWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 3.233rem;
  height: 3.233rem;

  right: 0.523rem;
  top: 0.285rem;

  border: none;

  background-color: transparent;
  z-index: 10;

  > svg {
    pointer-events: none;
  }
`;

const StVotingDesc = styled.div`
  width: 17.6rem;
  height: 8.6rem;

  position: relative;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  border-radius: 0rem 0rem 1.141rem 1.141rem;
`;

const StVotingTitle = styled.h2`
  margin-top: 1.3rem;
  margin-left: 1.4rem;

  ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16}
  color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StVotingDate = styled.p`
  margin-top: 0.6rem;
  margin-left: 1.426rem;

  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
`;

const StVotingPeopleNum = styled.p`
  position: absolute;
  right: 1.136rem;
  bottom: 1.083rem;

  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  opacity: 0.5;
`;

export default EndedVoting;
