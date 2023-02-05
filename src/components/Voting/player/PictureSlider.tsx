import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { IcSelectRound } from '../../../asset/icon';
import {
  IMAGE_MARGIN_RATIO,
  MOVE_THREE_MARGIN,
  MOVE_THREE_SLIDER,
  PX_TO_REM,
  SLIDER_FULL_WIDTH_RATIO,
  SLIDER_ITEM_HALF_WIDTH,
  SLIDER_UNSELECT_WIDTH_RATIO,
} from '../../../constant/slider';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { playerStickerInfoState, votingInfoState } from '../../../recoil/player/atom';
import { PictureInfo } from '../../../types/vote';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';
import SelectPicture from './SelectPicture';

const PictureSlider = () => {
  const votingInfoAtom = useRecoilValue(votingInfoState);
  const [playerStickerInfo, setPlayerStickerInfo] = useRecoilState(playerStickerInfoState);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const pictureInfoList: PictureInfo[] = votingInfoAtom.Picture;

  useEffect(() => {
    window.scrollTo(0, 0);
    setPlayerStickerInfo({ ...playerStickerInfo, pictureId: pictureInfoList[currentIdx].id });
  }, [transX]);

  return (
    <>
      <StSliderPictureWrapper ref={ref}>
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
              const maxIndex = pictureInfoList.length - 1;
              Array(2)
                .fill(0)
                .map((_, i) => 2 - i)
                .some((num) => {
                  if (deltaX < -SLIDER_ITEM_HALF_WIDTH * num) {
                    setCurrentIdx(modifySliderRange(currentIdx + num, 0, maxIndex));
                    return true;
                  }
                  if (deltaX > SLIDER_ITEM_HALF_WIDTH * num) {
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
                <SelectPicture src={url} alt="투표_선택_이미지1" width={window.screen.width * 0.08} />
              ) : (
                <img src={url} className="unSelect_picture" alt="투표_선택_이미지2" />
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

const StSliderPictureWrapper = styled.section`
  width: 100%;
  height: 50rem;

  overflow: hidden;

  position: relative;
`;
const StSliderPictureUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number; width: number }>`
  display: flex;
  align-items: center;
  position: absolute;
  ${({ currentIdx, dragItemWidth, width }) =>
    !currentIdx
      ? css`
          left: ${(dragItemWidth * IMAGE_MARGIN_RATIO) / PX_TO_REM}rem;
        `
      : css`
          left: ${((width * SLIDER_FULL_WIDTH_RATIO) / MOVE_THREE_SLIDER +
            (dragItemWidth * IMAGE_MARGIN_RATIO) / MOVE_THREE_MARGIN) /
          PX_TO_REM}rem;
        `}

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / PX_TO_REM}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-in -out 0s;
    `};
  width: ${({ width }) => (width * SLIDER_FULL_WIDTH_RATIO) / PX_TO_REM}rem;
  touch-action: auto;

  img.unSelect_picture {
    width: ${({ width }) => (width * SLIDER_UNSELECT_WIDTH_RATIO) / PX_TO_REM}rem;
    height: 32.5rem;

    margin: 6.1rem 1.3rem 0 1.3rem;
    opacity: 0.5;

    border-radius: 1rem;

    object-fit: cover;
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
