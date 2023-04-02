import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import {
  IcAngleMenu,
  IcBackgroundMenu,
  IcCheeryBlossoms,
  IcFaceMenu,
  IcJustMenu,
  IcLily,
  IcRose,
  IcSelectRound,
  IcSunFlower,
} from '../../../asset/icon';
import { Angle, Face, Just, Mood } from '../../../asset/lottie';
import {
  FLOWER_REASON_MENU_ITEM_WIDTH,
  REASON_MENU_ITEM_MAX_INDEX,
  REASON_MENU_ITEM_WIDTH,
} from '../../../constant/slider';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { playerStickerInfoState } from '../../../recoil/player/atom';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';

interface ReasonSliderProps {
  isFlowerVoting: boolean;
}
const ReasonSlider = (props: ReasonSliderProps) => {
  const { isFlowerVoting } = props;

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();
  const [playerStickerInfo, setPlayerStickerInfo] = useRecoilState(playerStickerInfoState);

  console.log('슬라이더', playerStickerInfo);
  const lottieList = [Face, Face, Angle, Mood, Just];
  const menuIconList: JSX.Element[] = isFlowerVoting
    ? [
        <div key="hidden_angle" className="hidden">
          empty div
        </div>,
        <IcCheeryBlossoms className="menu" key="cheeryBlossoms" />,
        <IcLily className="menu" key="lily" />,
        <IcSunFlower className="menu" key="sunflower" />,
        <IcRose className="menu" key="rose" />,
      ]
    : [
        <div key="hidden_angle" className="hidden">
          empty div
        </div>,
        <IcFaceMenu className="menu" key="face" />,
        <IcAngleMenu className="menu" key="angle" />,
        <IcBackgroundMenu className="menu" key="background" />,
        <IcJustMenu className="menu" key="just" />,
      ];
  const navIconRenderList = Array(4).fill(0);

  useEffect(() => {
    if (!playerStickerInfo.location.length) setPlayerStickerInfo({ ...playerStickerInfo, emoji: currentIdx });
  }, [currentIdx]);

  return (
    <StReasonSliderWrapper>
      <StDragWReasonWrapper ref={ref}>
        <StDragWReasonUl
          currentIdx={currentIdx}
          dragItemWidth={isFlowerVoting ? FLOWER_REASON_MENU_ITEM_WIDTH : REASON_MENU_ITEM_WIDTH}
          isFlowerVoting={isFlowerVoting}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              if (deltaX < -REASON_MENU_ITEM_WIDTH / 2) {
                setCurrentIdx(modifySliderRange(currentIdx + 1, 0, REASON_MENU_ITEM_MAX_INDEX));
              }
              if (deltaX > REASON_MENU_ITEM_WIDTH / 2) {
                setCurrentIdx(modifySliderRange(currentIdx - 1, 0, REASON_MENU_ITEM_MAX_INDEX));
              }

              setTransX(0);
            },
          })}>
          {menuIconList.map((menu, idx) =>
            !idx ? (
              <li key={idx} className="unselect_item">
                {menu}
              </li>
            ) : idx !== currentIdx + 1 ? (
              <li key={idx} className="unselect_item">
                <div className="lotte">{menu}</div>
              </li>
            ) : (
              <li key={idx}>
                {isFlowerVoting ? (
                  <div className="lotte">{menu}</div>
                ) : (
                  <Lottie className="lotte" animationData={lottieList[idx]} loop={false}>
                    {menu}
                  </Lottie>
                )}
              </li>
            ),
          )}
        </StDragWReasonUl>
      </StDragWReasonWrapper>
      <StSelectRoundNav>
        {navIconRenderList.map((_, idx) =>
          idx === currentIdx ? (
            <IcSelectRound key={`select_round_nav${idx}`} fill="#FF5D5D" />
          ) : (
            <IcSelectRound key={`unselect_round_nav1${idx}`} fill="#E8EBEF" />
          ),
        )}
      </StSelectRoundNav>
    </StReasonSliderWrapper>
  );
};

export default ReasonSlider;
const StReasonSliderWrapper = styled.section`
  position: absolute;
  top: 55%;

  width: 100%;
`;
const StDragWReasonWrapper = styled.article`
  overflow: hidden;
`;
const StDragWReasonUl = styled.ul<{
  currentIdx: number;
  dragItemWidth: number;
  transX: number;
  isFlowerVoting: boolean;
}>`
  display: flex;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * (dragItemWidth + 8) + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 300}ms ease-out 0s;
    `};
  .lotte {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    width: ${({ isFlowerVoting }) => (isFlowerVoting ? '14.2rem' : '19.6rem')};
    height: 19.6rem;

    & > svg.menu {
      position: absolute;
      top: 14rem;

      z-index: 1;

      touch-action: pan-x;
    }
  }
  & > .unselect_item {
    opacity: 0.5;
    & > .hidden {
      width: 12rem;
      height: 4.8rem;

      visibility: hidden;
    }
  }
`;

const StSelectRoundNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  margin-top: 0.5rem;

  gap: 0.8rem;
`;
