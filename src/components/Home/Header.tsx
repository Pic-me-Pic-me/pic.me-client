import React from 'react';
import styled from 'styled-components';

import { IcNextArrow } from '../../asset/icon';
import { BannerImg } from '../../asset/image';
import useModal from '../../lib/hooks/useModal';
import Guide from './Guide';

const Header = () => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <StBannerWrapper>
        <StBannerImg src={BannerImg} alt="배너 이미지" />
        <StGuideBtn type="button" onClick={() => toggle()}>
          <p>픽미 사용방법 A부터 Z까지</p>
          <IcNextArrow />
        </StGuideBtn>
        <Guide isShowing={isShowing} handleHide={toggle} />
      </StBannerWrapper>
    </>
  );
};

export default Header;

const StBannerWrapper = styled.header`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 8.8rem;

  border-radius: 1.2rem;
`;

const StBannerImg = styled.img`
  width: 100%;
  border-radius: 1.2rem;
  object-fit: fill;
`;

const StGuideBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 7.4rem;
  margin-top: -7.5rem;
  padding: 2.8rem 2.9rem 2.7rem 2.4rem;

  border: none;
  border-radius: 1.2rem;
  background-color: rgba(0, 0, 0, 0);

  > p {
    text-align: center;
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }
`;
