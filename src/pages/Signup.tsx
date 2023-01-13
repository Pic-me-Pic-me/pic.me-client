import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcPickmeLogo } from '../asset/icon';
import HeaderLayout from '../components/Layout/HeaderLayout';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderLayout HeaderTitle="회원가입" isBanner handleGoback={() => navigate(-1)}></HeaderLayout>
      <StBlackBackground>
        <IcPickmeLogo />
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

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  > svg {
    margin-top: 1.2rem;
  }
`;

const StWhiteSection = styled.section`
  width: 100%;
  margin-top: 3.039rem;
  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

export default Signup;
