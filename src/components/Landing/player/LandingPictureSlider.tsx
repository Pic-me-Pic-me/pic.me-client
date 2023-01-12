import styled, { css } from 'styled-components';

import { IcSelectRound } from '../../../asset/icon';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { loading } from '../../common/style/animation';
import LadingSelectPicture from './LandingSelectPicture';

const LandingPictureSlider = () => {
  const { ref, width } = useCarouselSize();
  return (
    <>
      <StSliderPictureWrapper ref={ref}>
        <StSliderPictureUl currentIdx={0} dragItemWidth={width} width={window.screen.width}>
          <LadingSelectPicture />
          <div className="unSelect_picture"></div>
        </StSliderPictureUl>
      </StSliderPictureWrapper>
      <StSelectRoundNav>
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <IcSelectRound key="unselect_round" fill="#E8EBEF" />
          ))}
      </StSelectRoundNav>
    </>
  );
};

export default LandingPictureSlider;

const StSliderPictureWrapper = styled.section`
  width: 100%;
  height: 50rem;

  overflow: hidden;

  position: relative;
`;
const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; width: number }>`
  display: flex;
  align-items: center;
  position: absolute;
  ${({ currentIdx, dragItemWidth, width }) =>
    currentIdx === 0
      ? css`
          left: ${(dragItemWidth * 0.1) / 10}rem;
        `
      : css`
          left: ${(width * 1.5) / 35 + (dragItemWidth * 0.1) / 30}rem;
        `}

  width: ${({ width }) => (width * 1.5) / 10}rem;
  touch-action: auto;

  & > .unSelect_picture {
    width: 60%;
    height: 32.5rem;

    margin: 6.1rem 1.3rem 0 1.3rem;
    opacity: 0.5;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 1rem;

    animation: ${loading} 2s infinite linear;
  }
`;

const StSelectRoundNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  margin-bottom: 1.8rem;

  gap: 0.8rem;
`;
