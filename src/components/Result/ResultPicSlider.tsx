import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SLIDER_ITEM_HALF_WIDTH } from '../../constant/slider';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import useGetVoteResult from '../../lib/hooks/useGetVoteResult';
import { MakerPictureData } from '../../types/vote';
import { modifySliderRange, picmeSliderEvent } from '../../utils/picmeSliderEvent';
import { StickerAttachImg } from '../common';

export default function ResultPicSlider() {
  const { voteId } = useParams<{ voteId: string }>();
  const { voteResult, isLoading, isError } = useGetVoteResult(voteId);

  const pictureInfoList = voteResult?.Picture as MakerPictureData[];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  return (
    <>
      <StSliderPictureWrapper>
        <StSliderPictureUl
          currentIdx={currentIdx}
          dragItemWidth={width}
          transX={transX}
          width={window.screen.width}
          {...picmeSliderEvent({
            onDragChange: (deltaX, deltaY) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX, deltaY) => {
              Array(2)
                .fill(0)
                .map((_, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -SLIDER_ITEM_HALF_WIDTH * num) {
                    setCurrentIdx(1);
                    return true;
                  }
                  if (deltaX > SLIDER_ITEM_HALF_WIDTH * num) {
                    setCurrentIdx(0);
                    return true;
                  }
                });
              setTransX(0);
            },
          })}>
          {pictureInfoList.map(({ url }, idx) => (
            <li key={idx}>
              {idx === currentIdx ? (
                <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={100} imgHight={56} />
              ) : (
                <img src={url} className="unSelect_picture" alt="선택_안된_이미지1" />
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

const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>``;
