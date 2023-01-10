import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { IcSelectRound } from '../../../asset/icon';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { stickerInfoState, votingInfoState } from '../../../recoil/player/atom';
import { PictureInfo } from '../../../types/vote';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';
import SelectPicture from './SelectPicture';

const PictureSlider = () => {
  const votingInfoAtom = useRecoilValue(votingInfoState);
  const [stickerInfo, setStickerInfo] = useRecoilState(stickerInfoState);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const pictureInfoList: PictureInfo[] = votingInfoAtom.Picture;

  useEffect(() => {
    window.scrollTo(0, 0);
    setStickerInfo({ ...stickerInfo, pictureId: pictureInfoList[currentIdx].id });
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
    currentIdx === 0
      ? css`
          left: ${(dragItemWidth * 0.1) / 10}rem;
        `
      : css`
          left: ${(width * 1.5) / 35 + (dragItemWidth * 0.1) / 30}rem;
        `}

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-in -out 0s;
    `};
  width: ${({ width }) => (width * 1.5) / 10}rem;
  touch-action: auto;

  img.unSelect_picture {
    width: ${({ width }) => width * 0.06}rem;
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
