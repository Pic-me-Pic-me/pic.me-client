import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcSignupBannerLogo } from '../asset/icon';
import HeaderLayout from '../components/Layout/HeaderLayout';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderLayout HeaderTitle="회원가입" isBanner handleGoback={() => navigate(-1)}></HeaderLayout>
      <StBlackBackground>
        <IcSignupBannerLogo />
        <StWhiteSection>
          <Outlet />
        </StWhiteSection>
      </StBlackBackground>
    </>
  );
};

const StBlackBackground = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  > svg {
    margin-top: 1.2rem;
  }
`;

const StWhiteSection = styled.section`
  position: fixed;
  bottom: 0;

  width: 100%;
  height: 75.3rem;

  border-radius: 1.4rem 1.4rem 0rem 0rem;
  border: 1px red solid;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

export default Signup;
