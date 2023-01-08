import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { useCarouselSize } from '../../lib/hooks/result';
import picmeSliderEvent, { modifySliderRange } from '../../utils/picmeSliderEvent';
import resultSample from '../asset/image/resultSample.png';

export const ResultSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  // useEffect(() => {
  //   setStickerInfo({ ...stickerInfo, pictureId: pictureInfoList[currentIdx].id });
  // }, [transX]);
  return (
    <>
      {/* <StSliderPictureWrapper ref={ref}>
        <StSliderPictureUl
          currentIdx={currentIdx}
          dragItemWidth={183}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX, deltaY) => {
              const maxIndex = pictureInfoList.length - 1;

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
          {pictureInfoList.map(({ url }, idx) => (
            <li key={idx}>
              {idx === currentIdx ? (
                <SelectPicture src={url} alt="투표_선택_이미지1" />
              ) : (
                <img src={url} className="unSelect_picture" alt="투표_선택_이미지2" />
              )}
            </li>
          ))}
        </StSliderPictureUl>
      </StSliderPictureWrapper> */}
    </>
  );
};

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
          left: 5.75rem;
        `
      : css`
          left: 11.5rem;
        `}
  width : 59.8rem;
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
    margin: 6.1rem 1.3rem 0 1.3rem;
    opacity: 0.5;
  }
`;
const StTitle = styled.h1``;
