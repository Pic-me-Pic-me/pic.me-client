import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PX_TO_REM, RESULT_IMAGE_HALF_WIDTH, RESULT_SLIDER_FULL_WIDTH_RATIO } from '../../constant/slider';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import useGetVoteResult from '../../lib/hooks/useGetVoteResult';
import Error404 from '../../pages/Error404';
import { MakerPictureData } from '../../types/vote';
import { modifySliderRange, picmeSliderEvent } from '../../utils/picmeSliderEvent';
import { StickerAttachImg } from '../common';

interface ResultPicSliderProps {
  chosenPictureIdx: number;
  setChosenPictureIdx: (idx: number) => void;
}
export default function ResultPicSlider(props: ResultPicSliderProps) {
  const { chosenPictureIdx, setChosenPictureIdx } = props;

  const { voteId } = useParams<{ voteId: string }>();
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);

  const pictureInfoList = voteResult?.Picture as MakerPictureData[];

  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  if (isError) {
    return <Error404 />;
  }
  return (
    <>
      <StSliderPictureWrapper ref={ref}>
        <StSliderPictureUl
          currentIdx={chosenPictureIdx}
          dragItemWidth={width}
          transX={transX}
          width={window.screen.width}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(deltaX);
            },
            onDragEnd: (deltaX, deltaY) => {
              const maxIndex = 1;
              [2, 1].some((num) => {
                if (deltaX < -RESULT_IMAGE_HALF_WIDTH) {
                  setChosenPictureIdx(modifySliderRange(chosenPictureIdx + num, 0, maxIndex));
                  return true;
                }
                if (deltaX > RESULT_IMAGE_HALF_WIDTH) {
                  setChosenPictureIdx(modifySliderRange(chosenPictureIdx - num, 0, maxIndex));
                  return true;
                }
              });
              setTransX(0);
            },
          })}>
          {pictureInfoList.map(({ url }, idx) => (
            <li key={idx}>
              <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={85} imgHight={49} />
            </li>
          ))}
        </StSliderPictureUl>
      </StSliderPictureWrapper>
    </>
  );
}

const StSliderPictureWrapper = styled.section`
  width: 100%;
  height: 50rem;

  overflow: hidden;

  position: relative;
`;

const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: ${({ width }) => (width * RESULT_SLIDER_FULL_WIDTH_RATIO) / PX_TO_REM}rem;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};

  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 0s;
    `};

  > li {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  touch-action: auto;
`;
