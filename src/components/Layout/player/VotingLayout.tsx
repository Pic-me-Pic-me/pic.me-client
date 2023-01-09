import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface VotingLayoutProps {
  votingTitle: string;
  children?: ReactNode;
  btnTitle: string;
  isActiveBtn: boolean;
  handlePlayer: React.MouseEventHandler;
}

const Voting = (props: VotingLayoutProps) => {
  const { votingTitle, children, btnTitle, isActiveBtn, handlePlayer } = props;
  return (
    <StPlayerVotingWrapper>
      <header>
        <StVotingTitle>{votingTitle}</StVotingTitle>
      </header>
      {children}
      <footer>
        <StPlayerBtn onClick={handlePlayer} isActiveBtn={isActiveBtn}>
          {btnTitle}
        </StPlayerBtn>
      </footer>
    </StPlayerVotingWrapper>
  );
};
export default Voting;

const StPlayerVotingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StVotingTitle = styled.h1`
  margin-top: 3.9rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22};
`;

const StPlayerBtn = styled.button<{ isActiveBtn: boolean }>`
  width: 39rem;
  height: 5.8rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme, isActiveBtn }) =>
    isActiveBtn ? theme.colors.Pic_Color_Coral : theme.colors.Pic_Color_Gray_Black};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
`;
