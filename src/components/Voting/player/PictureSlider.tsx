import { useState } from 'react';
import styled, { css } from 'styled-components';

import { PictureId1, PictureId2 } from '../../../asset/image';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';

const PictureSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const pictureSrcList: string[] = [PictureId1, PictureId2];
  console.log(currentIdx);
  return (
    <>
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
              {idx !== currentIdx ? (
                <img src={src} className="select_item" alt="투표_선택_이미지1" />
              ) : (
                <img src={src} alt="투표_선택_이미지2" />
              )}
            </li>
          ))}
        </StSliderPictureUl>
      </StSliderPictureWrapper>
    </>
  );
};

export default PictureSlider;

const StSliderPictureWrapper = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  position: relative;
`;
const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  position: absolute;
  ${({ currentIdx }) =>
    currentIdx === 0
      ? css`
          left: 4.7rem;
        `
      : css`
          left: 11rem;
        `}
  top: 19.2rem;
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
    width: 33.5rem;
    height: 44.7rem;
    margin-top: 1.7rem;

    border-radius: 1rem;

    object-fit: cover;
  }
  .select_item {
    width: 24.8rem;
    height: 32.5rem;

    margin: 6.1rem 1.6rem;
    opacity: 0.5;
  }
`;
