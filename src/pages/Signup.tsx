import React from 'react';
import styled, { css } from 'styled-components';

import { SignupBanner } from '../asset/image';
import AddAccount from '../components/Signup/AddAccount';
import Nickname from '../components/Signup/Nickname';

const Signup = () => (
  <>
    <StBannerWrapper>
      <SignupBanner />
    </StBannerWrapper>
    <StWhiteSection>
      <AddAccount></AddAccount>
      {/* <Nickname></Nickname> */}
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
