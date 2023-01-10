import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcSignupBanner } from '../asset/icon';
import HeaderLayout from '../components/Layout/HeaderLayout';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderLayout HeaderTitle="회원가입" isBanner handleGoback={() => navigate(-1)}></HeaderLayout>
      <StBannerWrapper>
        <IcSignupBanner />
      </StBannerWrapper>

      <StWhiteSection>
        <Outlet />
      </StWhiteSection>
    </>
  );
};

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
