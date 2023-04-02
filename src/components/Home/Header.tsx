import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import { IcFlowerVote, IcMainBanner, IcNextArrow, IcNormalVote, IcSubBanner } from '../../asset/icon';
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

const SLIDER_IMAGES = [
  {
    id: 0,
    bannerImg: <IcMainBanner />,
    title: '친구들이 보는 ‘나를 닮은 꽃’은?',
    subTitle: 'EVENT',
    buttonImg: <IcFlowerVote />,
    buttonName: '투표 만들기',
  },
  {
    id: 1,
    bannerImg: <IcSubBanner />,
    title: '픽미 사용방법 A부터 Z까지',
    subTitle: '공지',
    buttonImg: <IcNormalVote />,
    buttonName: '알아보기',
  },
];

const Header = () => {
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    switch (index) {
      case 0:
        navigate('/voting/flower');
        break;
      case 1:
        toggle();
        break;
      default:
        console.error(e);
    }
  };

  return (
    <>
      <StBannerWrapper>
        <Slider {...SLIDER_SETTINGS}>
          {SLIDER_IMAGES.map(({ id, bannerImg, subTitle, title, buttonImg, buttonName }) => (
            <StBannerImg key={id}>
              {bannerImg}
              <StBannerBtn type="button" onClick={(e) => handleClick(e, id)}>
                {buttonImg}
                <div>
                  <p>{subTitle}</p>
                  <h1>{title}</h1>
                </div>
                {buttonName}
                <IcNextArrow />
              </StBannerBtn>
            </StBannerImg>
          ))}
        </Slider>
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
  margin-top: 6.5rem;
  margin-bottom: 4.6rem;

  border-radius: 1.2rem;

  & > .slick-slider > .slick-dots > li {
    width: 0.7rem;
    height: 0.7rem;
    background-color: #d9d9d9;
    border-radius: 0.5rem;

    & > button {
      display: none;
    }
  }

  & > .slick-slider > .slick-dots > .slick-active {
    width: 0.7rem;
    height: 0.7rem;
    background-color: #ff5d67;
    border-radius: 0.5rem;
  }
`;

const StBannerImg = styled.div`
  position: relative;

  & > svg {
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    object-fit: fill;
  }
`;

const StBannerBtn = styled.button`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  bottom: 0;

  padding-left: 1rem;
  padding-right: 2.5rem;
  width: 100%;
  height: 6.7rem;

  background: transparent;
  backdrop-filter: blur(1.8rem);
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_4};
  border: none;
  border-radius: 0 0 1.2rem 1.2rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
    padding-right: 3.6rem;

    & > p {
      color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
      ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    }
    & > h1 {
      color: ${({ theme }) => theme.colors.Pic_Color_Gray_6};
      ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};
    }
  }
`;
