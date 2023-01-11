import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcOnboardingLogo, IcStickers } from '../../asset/icon';
import { OnboardingBG } from '../../asset/image';

const MakerLanding = () => {
  const navigate = useNavigate();
  return (
    <StOnboarding>
      <StFirstSection>
        <StStickers>
          <IcStickers />
        </StStickers>
        {/* <StTitle>
          친구가
          <br />
          골라주는
          <br />
          나의 베스트 Pic!
          <IcOnboardingLogo />
        </StTitle>
        <p>스크롤 해주세요</p>
        <StStartBtn>시작하기</StStartBtn> */}
      </StFirstSection>
    </StOnboarding>
  );
};

export default MakerLanding;

const StOnboarding = styled.div`
  width: 100%;
`;

const StStickers = styled.div`
  & > svg {
    width: 100%;
    margin-top: 11.3rem;
  }
`;
const StFirstSection = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 94.1rem;
  padding: 0rem 2.8rem;

  background-image: url(${OnboardingBG});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;

  & > p {
    display: flex;
    justify-content: center;
    margin-top: 23.469rem;
    margin-bottom: 12.463rem;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16}
  }
`;

const StTitle = styled.h1`
  padding-top: 18.9rem;
  margin-left: -0.245rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 28.8035px;
  line-height: 34px;

  white-space: pre-wrap;

  & > svg {
    margin-top: 3.6rem;
    padding-right: 4.617rem;
  }
`;

const StStartBtn = styled.button`
  width: 100%;
  height: 5.763rem;
  padding: 0rem;

  color: white;
  background-color: #ff5e67;
  border: none;
  border-radius: 1.9rem;
`;
