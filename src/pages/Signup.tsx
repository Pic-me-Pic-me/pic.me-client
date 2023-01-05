import React from 'react';
import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcSignupBanner } from '../asset/icon';

const Signup = () => (
  <>
    <StBannerWrapper>
      <IcSignupBanner />
    </StBannerWrapper>

    <StWhiteSection>
      <Outlet />
    </StWhiteSection>
  </>
);

const StBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
`;
const StWhiteSection = styled.section`
  position: fixed;
  bottom: 0;

  width: 43rem;
  height: 75.3rem;

  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

export default Signup;
