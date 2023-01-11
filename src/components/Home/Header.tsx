<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

import { HeaderLayout } from '../Layout';

const Header = () => {
  const navigate = useNavigate();
  const handlePrevpage = () => {
    navigate('/');
  };
  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={handlePrevpage} />
    </>
  );
};
=======
import React from 'react';
import styled from 'styled-components';

import { IcNextArrow } from '../../asset/icon';
import { BannerImg } from '../../asset/image';

const Header = () => (
  <StBannerWrapper>
    <StBannerImg src={BannerImg} alt="배너 이미지" />
    <StGuideBtn type="button">
      <p>픽미 사용방법 A부터 Z까지</p>
      <IcNextArrow />
    </StGuideBtn>
  </StBannerWrapper>
);
>>>>>>> 465c65f647b701fe6e74acdebda5d222dfcbc066

export default Header;

const StBannerWrapper = styled.header`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 26.4rem;
  margin-top: 8.8rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
`;

const StBannerImg = styled.img`
  height: 19rem;
  border-radius: 1.2rem;
`;

const StGuideBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 7.4rem;
  padding: 2.8rem 2.9rem 2.7rem 2.4rem;

  border: none;
  border-radius: 1.2rem;
  background: inherit;

  > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }
`;
