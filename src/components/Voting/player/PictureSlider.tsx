import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IcSelectRound } from '../../../asset/icon';
import { PictureId1, PictureId2 } from '../../../asset/image';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';
import SelectPicture from './SelectPicture';

const PictureSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const pictureSrcList: string[] = [PictureId1, PictureId2];
  return (
    <>
      <StPictrueSubTitle>*당신의 모든 선택은 익명으로 전달됩니다</StPictrueSubTitle>
      <StSliderPictureWrapper ref={ref}>
        <StSliderPictureUl
          currentIdx={currentIdx}
          dragItemWidth={335}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX, deltaY) => {
              const maxIndex = pictureSrcList.length - 1;

              Array(2)
                .fill(0)
                .map((v, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -156 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx + num, 0, maxIndex));
                    return true;
                  }
                  if (deltaX > 156 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx - num, 0, maxIndex));
                    return true;
                  }
                });
              setTransX(0);
            },
          })}>
          {pictureSrcList.map((src, idx) => (
            <li key={idx}>
              {idx === currentIdx ? (
                <SelectPicture src={src} alt="투표_선택_이미지1" />
              ) : (
                <img src={src} className="unSelect_picture" alt="투표_선택_이미지2" />
              )}
            </li>
          ))}
        </StSliderPictureUl>
      </StSliderPictureWrapper>

      <StSelectRoundNav>
        {Array(2)
          .fill(0)
          .map((_, idx) =>
            idx === currentIdx ? (
              <IcSelectRound key="select_round" fill="#FF5D5D" />
            ) : (
              <IcSelectRound key="unselect_round" fill="#E8EBEF" />
            ),
          )}
      </StSelectRoundNav>
    </>
  );
};

export default PictureSlider;
const StPictrueSubTitle = styled.p`
  margin-top: 3rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
`;
const StSliderPictureWrapper = styled.section`
  width: 100%;
  height: 50rem;
  overflow: hidden;

  position: relative;
`;
const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  ${({ currentIdx }) =>
    currentIdx === 0
      ? css`
          left: 4.7rem;
        `
      : css`
          left: 11rem;
        `}
  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 0s;
    `};
  touch-action: auto;
  img {
    border-radius: 1rem;

    object-fit: cover;
  }
  img.unSelect_picture {
    width: 24.8rem;
    height: 32.5rem;

    margin: 6.1rem 1.6rem 0 1.6rem;
    opacity: 0.5;
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
