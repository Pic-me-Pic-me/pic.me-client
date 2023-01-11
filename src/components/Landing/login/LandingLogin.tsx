import React from 'react';
import styled from 'styled-components';

import { loading } from '../../common/styled/animation';

const LandingLogin = () => (
  <StLandingBannerWrapper>
    <StLandingForm>
      <StWhiteSection>
        <StTitle />
        <StInput />
        <StInput />
        <StBtnSection>
          <StBtn />
          <StBtn />
          <StDivider />
          <StBtn />
        </StBtnSection>
      </StWhiteSection>
    </StLandingForm>
  </StLandingBannerWrapper>
);

export default LandingLogin;

const StLandingBannerWrapper = styled.div`
  display: flex;
  justify-content: center;

  position: absolute;
  top: 0;

  width: 100%;
  height: 22.9rem;

  z-index: -1;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  animation: ${loading} 2s infinite linear;
`;

const StLandingForm = styled.section`
  width: 100%;

  margin-top: 17.9rem;
`;

const StWhiteSection = styled.article`
  width: 100%;
  padding: 4.2rem 2rem 0rem 2rem;

  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StTitle = styled.h2`
  width: 5.2rem;
  height: 2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  animation: ${loading} 2s infinite linear;
`;

const StInput = styled.div`
  margin-top: 1.2rem;

  width: 100%;
  height: 6rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  border-radius: 0.5rem;

  animation: ${loading} 2s infinite linear;
`;

const StBtnSection = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 6.5rem;
`;

const StBtn = styled.div`
  margin-top: 0.8rem;

  width: 100%;
  height: 6rem;

  border-radius: 0.9rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  animation: ${loading} 2s infinite linear; ;
`;

const StDivider = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  width: 7.1rem;
  height: 1.5rem;

  border-radius: 0.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  animation: ${loading} 2s infinite linear; ;
`;
