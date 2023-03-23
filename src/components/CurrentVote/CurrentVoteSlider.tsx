import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { StickerAttachImg } from '../../components/common';
import { useCarouselSize } from '../../lib/hooks/useCarouselSize';
import { pictureCurrentIdx, pictureResultState, stickerResultState } from '../../recoil/maker/atom';
import { jsonGetStickerList } from '../../utils/jsonGetStickerList';
import { modifySliderRange, picmeSliderEvent } from '../../utils/picmeSliderEvent';

const CurrentVoteSlider = () => {
  const [transX, setTransX] = useState<number>(0);

  const setStickerResultState = useSetRecoilState(stickerResultState);
  const setCurrentIdx = useSetRecoilState(pictureCurrentIdx);
  const pictureResult = useRecoilValue(pictureResultState);
  const currentIdx = useRecoilValue(pictureCurrentIdx);

  const { ref, width } = useCarouselSize();

  useEffect(() => {
    setStickerResultState(jsonGetStickerList(pictureResult[currentIdx].Sticker));
  }, [currentIdx, pictureResult]);

  return (
    <>
      <CurrentVoteSliderWrapper ref={ref}>
        <StImgUl
          currentIdx={currentIdx}
          dragItemWidth={width}
          transX={transX}
          width={window.screen.width}
          {...picmeSliderEvent({
            onDragChange: (deltaX) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = 1;
              Array(2)
                .fill(0)
                .map((v, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -162 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx + num, 0, maxIndex));
                    return true;
                  }
                  if (deltaX > 162 * num) {
                    setCurrentIdx(modifySliderRange(currentIdx - num, 0, maxIndex));
                    return true;
                  }
                });

              setTransX(0);
            },
          })}>
          {pictureResult.map(({ pictureId, url, count }, idx) => (
            <li key={idx}>
              {currentIdx === idx ? (
                <>
                  <StickerAttachImg stickerAttachImgSrc={url} imgWrapperWidthPercent={100} imgHight={43.4} />
                </>
              ) : (
                <StUnselectedImg width={window.screen.width} src={url} alt="선택되지 않은 사진" />
              )}
            </li>
          ))}
        </StImgUl>
      </CurrentVoteSliderWrapper>
      <StDotWrapper>
        {!currentIdx ? (
          <>
            <StSelectedDot />
            <StUnselectedDot />
          </>
        ) : (
          <>
            <StUnselectedDot />
            <StSelectedDot />
          </>
        )}
      </StDotWrapper>
    </>
  );
};

export default CurrentVoteSlider;

const CurrentVoteSliderWrapper = styled.article`
  width: 100%;
  height: 43.4rem;

  position: relative;

  overflow: hidden;
`;

const StImgUl = styled.ul.attrs<{
  currentIdx: number;
  dragItemWidth: number;
  transX: number;
  width: number;
}>(({ currentIdx, dragItemWidth, transX, width }) => ({
  style: {
    left:
      currentIdx === 0 ? `${(dragItemWidth * 0.05) / 10}rem` : `${(width * 1.5) / 45 + (dragItemWidth * 0.1) / 45}rem`,
    transform: `translateX(${(-currentIdx * dragItemWidth + transX) / 10.55}rem)`,
    transition: `transform ${transX ? 0 : 300}ms ease-in -out 0s`,
  },
}))<{
  currentIdx: number;
  dragItemWidth: number;
  transX: number;
  width: number;
}>`
  display: flex;

  align-items: center;
  position: absolute;
  gap: 1.3rem;

  height: 43rem;
  width: ${({ width }) => (width * 1.55) / 10}rem;
  touch-action: auto;

  & > li {
    position: relative;

    width: 100%;
  }
`;
const StUnselectedImg = styled.img<{ width: number }>`
  width: 100%;
  height: 43.4rem;

  opacity: 0.5;
  border-radius: 1.2rem;

  object-fit: cover;
`;

const StDotWrapper = styled.section`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.9rem;
`;

const StDotStructure = styled.div`
  width: 0.8rem;
  height: 0.8rem;

  border-radius: 50rem;
`;

const StSelectedDot = styled(StDotStructure)`
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;

const StUnselectedDot = styled(StDotStructure)`
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;
