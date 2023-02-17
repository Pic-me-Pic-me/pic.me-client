import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SignUpBanner } from '../asset/image';
import HeaderLayout from '../components/Layout/HeaderLayout';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderLayout HeaderTitle="회원가입" isBanner handleGoback={() => navigate(-1)}></HeaderLayout>
      <StBlackBackground>
        <img src={SignUpBanner} alt="배너" />
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

  position: absolute;
  top: 0;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  > img {
    height: 19.3rem;
    width: 100%;
  }
`;

const StWhiteSection = styled.section`
  width: 100%;
  margin-top: 3.039rem;
  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

export default Signup;
