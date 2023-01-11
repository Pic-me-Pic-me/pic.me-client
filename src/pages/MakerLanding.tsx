import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { OnboardingBG } from '../asset/image';

const MakerLanding = () => {
  const navigate = useNavigate();
  return (
      <StFristSection>
        <StTitle />친구가 골라주는 나의 베스트 Pic!</StTitle>
        <StStartBtn>시작하기</StStartBtn>
      </StFristSection>
  );
};

export default MakerLanding;

const StFristSection = styled.section`
  width: 100%;
  height: 94.1rem;
  padding: 0rem 2.8rem;

  background-image: url(${OnboardingBG});
`;

const StTitle = styled.h1`
color: white;
`;

const StStartBtn = styled.button`
  width: 100%;
  height: 5.763rem;

  color: white;
  background-color: #ff5e67;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  border: none;
  border-radius: 1.9rem;
`;
