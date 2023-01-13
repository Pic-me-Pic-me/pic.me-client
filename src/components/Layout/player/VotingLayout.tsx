import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface VotingLayoutProps {
  votingTitle: string;
  votingNextLineTitle?: string;
  pageType: string;
  votingSubTitle?: string;
  margin?: number;
  children?: ReactNode;
  btnTitle: string;
  isActiveBtn: boolean;
  handlePlayer: React.MouseEventHandler;
}

const VotingLayout = (props: VotingLayoutProps) => {
  const {
    votingTitle,
    votingNextLineTitle,
    votingSubTitle,
    pageType,
    margin,
    children,
    btnTitle,
    isActiveBtn,
    handlePlayer,
  } = props;
  return (
    <StPlayerVotingWrapper pageType={pageType}>
      <header>
        <StVotingTitle>{votingTitle}</StVotingTitle>
        <StVotingTitle>{votingNextLineTitle}</StVotingTitle>
        <StVotingSubTitle margin={margin}>{votingSubTitle}</StVotingSubTitle>
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
export default VotingLayout;

const StPlayerVotingWrapper = styled.div<{ pageType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  & > div::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
  & > header,
  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
  }

  & > header {
    height: ${({ pageType }) => (pageType === 'PictureVoting' ? 7.2 : 5.6)}rem;
    margin-top: 2rem;
    padding: 0 ${({ pageType }) => (pageType === 'StickerAttachment' ? 2.8 : 4.2)}rem;
  }
  & > footer {
    padding: 0rem 2rem;
  }
`;
const StVotingTitle = styled.h1`
  width: 100%;
  margin: 0rem 10%;

  text-align: center;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};

  word-break: break-all;
`;
const StVotingSubTitle = styled.h3<{ margin?: number }>`
  margin: ${({ margin }) => margin}rem 0rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};
`;
const StPlayerBtn = styled.button<{ isActiveBtn: boolean }>`
  width: 100%;
  height: 5.8rem;
  margin: 0rem 2rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme, isActiveBtn }) =>
    isActiveBtn ? theme.colors.Pic_Color_Coral : theme.colors.Pic_Color_Gray_Black};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
`;
