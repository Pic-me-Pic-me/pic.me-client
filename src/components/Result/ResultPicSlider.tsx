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

export default function ResultPicSlider() {
  const { voteId } = useParams<{ voteId: string }>();
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);

  const pictureInfoList = voteResult?.Picture as MakerPictureData[];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  if (isError) {
    return <Error404 />;
  }

  return (
    <>
      <StSliderPictureWrapper>
        <StSliderPicture
          currentIdx={currentIdx}
          dragItemWidth={width}
          transX={transX}
          width={window.screen.width}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(deltaX);
            },
            onDragEnd: (deltaX, deltaY) => {
              Array(2)
                .fill(0)
                .map((_, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -183 * num) {
                    setCurrentIdx(1);
                    return true;
                  }
                  if (deltaX > 183 * num) {
                    setCurrentIdx(0);
                    return true;
                  }
                });
              setTransX(0);
            },
          })}>
          <StickerAttachImg
            stickerAttachImgSrc={pictureInfoList[currentIdx].url}
            imgWrapperWidthPercent={90}
            imgHight={52}
          />
        </StSliderPicture>
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

const StSliderPicture = styled.article<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / PX_TO_REM}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-in -out 0s;
    `};

  touch-action: auto;
`;
