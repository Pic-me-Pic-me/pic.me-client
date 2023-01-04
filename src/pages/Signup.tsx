import React from 'react';
import styled, { css } from 'styled-components';

import { SignupBanner } from '../asset/icon';
import AddAccount from '../components/SignUp/AddAccount';
import Nickname from '../components/SignUp/Nickname';

const Signup = () => (
  <>
    <StBannerWrapper>
      <SignupBanner />
    </StBannerWrapper>
    <StWhiteSection>
      <AddAccount></AddAccount>
      <Nickname></Nickname>
    </StWhiteSection>
  </>
);

const StBannerWrapper = styled.div`
  position: absolute;
  top: 0rem;
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
