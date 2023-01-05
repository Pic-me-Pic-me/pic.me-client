import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IcAngleMenu, IcBackgroundMenu, IcFaceMenu, IcJustMenu } from '../../../asset/icon';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';

const ReasonSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  const menuIconList: JSX.Element[] = [
    <IcFaceMenu key="face" />,
    <IcAngleMenu key="angle" />,
    <IcBackgroundMenu key="background" />,
    <IcJustMenu key="just" />,
  ];

  return (
    <>
      <StDragWReasonWrapper ref={ref}>
        <StDragWReasonUl
          currentIdx={currentIdx}
          dragItemWidth={170}
          transX={transX}
          {...picmeSliderEvent({
            onDragChange: (deltaX) => {
              setTransX(modifySliderRange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = menuIconList.length - 1;
              Array(3)
                .fill(0)
                .map((v, i) => 3 - i)
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
          {menuIconList.map((menu, idx) =>
            idx !== currentIdx ? (
              <li key={idx} className="select_item">
                {menu}
              </li>
            ) : (
              <li key={idx}>{menu}</li>
            ),
          )}
        </StDragWReasonUl>
      </StDragWReasonWrapper>
    </>
  );
};

export default ReasonSlider;

const StDragWReasonWrapper = styled.section`
  width: 100%;
  height: 18rem;
  overflow: hidden;

  position: relative;
`;
const StDragWReasonUl = styled.ul<{ currentIdx: number; dragItemWidth: number; transX: number }>`
  display: flex;
  position: absolute;
  left: 12rem;

  ${({ currentIdx, dragItemWidth, transX }) =>
    css`
      transform: translateX(${(-currentIdx * dragItemWidth + transX) / 10}rem);
    `};
  ${({ transX }) =>
    css`
      transition: transform ${transX ? 0 : 200}ms ease-in -out 0s;
    `};

  & > .select_item {
    opacity: 0.5;
  }
`;
