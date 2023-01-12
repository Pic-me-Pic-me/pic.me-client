import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { loading } from '../../common/style/animation';

interface VotingLayoutProps {
  pageType: string;
  margin?: number;
  children?: ReactNode;
}

const LandingVoting = (props: VotingLayoutProps) => {
  const { pageType, margin, children } = props;
  return (
    <StPlayerVotingWrapper pageType={pageType}>
      <header>
        <div className="main_title"></div>
        {pageType !== 'ReasonVoting' && <StVotingSubTitle margin={margin}></StVotingSubTitle>}
      </header>
      {children}
      <footer>
        <div className="footer_btn"></div>
      </footer>
    </StPlayerVotingWrapper>
  );
};
export default LandingVoting;

const StPlayerVotingWrapper = styled.div<{ pageType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
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

    .main_title {
      width: 85%;
      height: 3rem;

      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
      border-radius: 0.5rem;

      animation: ${loading} 2s infinite linear;
    }
  }
  & > footer {
    padding: 0rem 2rem;

    & > .footer_btn {
      width: 100%;
      height: 5.8rem;
      margin: 0rem 2rem;

      border: none;
      border-radius: 0.9rem;

      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

      animation: ${loading} 2s infinite linear;
    }
  }

  & > .landging_img {
    width: 90%;
    height: 52rem;
    margin-bottom: 1.3rem;
    border-radius: 1rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 0.5rem;

    animation: ${loading} 2s infinite linear;

    touch-action: pan-y;
  }
`;

const StVotingSubTitle = styled.h3<{ margin?: number }>`
  width: 50%;
  height: 1.5rem;
  margin-top: ${({ margin }) => margin}rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.5rem;

  animation: ${loading} 2s infinite linear;
`;
