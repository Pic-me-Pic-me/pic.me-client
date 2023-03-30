import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import { IcMainBanner, IcNextArrow, IcSubBanner } from '../../asset/icon';
import useModal from '../../lib/hooks/useModal';
import Guide from './Guide';

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 4000,
  cssEase: 'linear',
};

const SLIDER_IMAGES = [<IcMainBanner key="0" />, <IcSubBanner key="1" />];

const Header = () => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <StBannerWrapper>
        <Slider {...SLIDER_SETTINGS}>
          {SLIDER_IMAGES.map((item, index) => (
            <StBannerImg key={index}>{item}</StBannerImg>
          ))}
        </Slider>
        <StGuideBtn type="button" onClick={toggle}>
          <p>픽미 사용방법 A부터 Z까지</p>
          <IcNextArrow />
        </StGuideBtn>
        <Guide isShowing={isShowing} handleHide={toggle} />
      </StBannerWrapper>
      <StMeatBall></StMeatBall>
    </>
  );
};

export default Header;

const StBannerWrapper = styled.header`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 6.5rem;

  border-radius: 1.2rem;
`;

const StBannerImg = styled.div`
  & > svg {
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    object-fit: fill;
  }
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

const StMeatBall = styled.div`
  height: 4.6rem;
`;
