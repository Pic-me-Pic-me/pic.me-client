import React from 'react';
import styled from 'styled-components';

import { IcNextArrow } from '../../asset/icon';

const Header = () => (
  <StBannerWrapper>
    <StBannerImg />
    <StGuideBtn type="button">
      <p>픽미 사용방법 A부터 Z까지</p>
      <IcNextArrow />
    </StGuideBtn>
  </StBannerWrapper>
);
export default Header;

const StBannerImg = styled.div`
  height: 19rem;
`;

const StBannerWrapper = styled.header`
  display: flex;
  flex-direction: column;

  width: 39rem;
  height: 26.4rem;
  margin: 8.8rem 2rem 1.5rem 2rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;

const StGuideBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 39rem;
  height: 7.4rem;
  padding: 2.8rem 2.9rem 2.7rem 2.4rem;

  border: none;
  border-radius: 1.2rem;
  background: inherit;

  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }
`;
