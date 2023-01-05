import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IcAngleMenu, IcBackgroundMenu, IcFaceMenu, IcJustMenu } from '../../../asset/icon';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { modifySliderRange, picmeSliderEvent } from '../../../utils/picmeSliderEvent';

const menuIconList: JSX.Element[] = [
  <IcFaceMenu key="face" />,
  <IcAngleMenu key="angle" />,
  <IcBackgroundMenu key="background" />,
  <IcJustMenu key="just" />,
];

const ReasonSlider = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const { ref, width } = useCarouselSize();

  return (
    <>
      <StDragWReasonWrapper ref={ref}>
        <StDragWReasonUl currentIdx={currentIdx} dragItemWidth={170} transX={transX}>
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
