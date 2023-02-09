import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import {
  IMAGE_MARGIN_RATIO,
  MOVE_THREE_MARGIN,
  MOVE_THREE_SLIDER,
  PX_TO_REM,
  SLIDER_FULL_WIDTH_RATIO,
} from '../../constant/slider';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import useGetVoteResult from '../../lib/hooks/useGetVoteResult';
import Error404 from '../../pages/Error404';
import { MakerPictureData } from '../../types/vote';
import { picmeSliderEvent } from '../../utils/picmeSliderEvent';
import { StickerAttachImg } from '../common';

interface ResultPicSliderProps {
  setChosenPictureIdx: (idx: number) => void;
}
export default function ResultPicSlider(props: ResultPicSliderProps) {
  const { setChosenPictureIdx } = props;

  const { voteId } = useParams<{ voteId: string }>();
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);

  const pictureInfoList = voteResult?.Picture as MakerPictureData[];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();
  console.log(width);

  if (isError) {
    return <Error404 />;
  }

  return (
    <>
      <StSliderPictureWrapper ref={ref}>
        <StSliderPictureUl
          currentIdx={currentIdx}
          dragItemWidth={width}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(deltaX);
            },
            onDragEnd: (deltaX, deltaY) => {
              if (deltaX < -183) {
                setCurrentIdx(0);
                setChosenPictureIdx(0);
                return true;
              }
              if (deltaX > 183) {
                setCurrentIdx(1);
                setChosenPictureIdx(1);
                return true;
              }
              setTransX(0);
            },
          })}>
          {pictureInfoList.map(({ url }, idx) => (
            <li key={idx}>
              {idx === currentIdx ? (
                <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={95.8} imgHight={52} />
              ) : (
                <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={85} imgHight={52} />
              )}
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

const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: 81.2rem;

  overflow: hidden;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${((-currentIdx * dragItemWidth) / 2 + transX) / 10}rem);
    `};

  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 0s;
    `};

  > li {
    width: 36.6rem;
    display: flex;
    justify-content: center;
  }

  touch-action: auto;
`;
