import React, { useState } from 'react';
import styled from 'styled-components';

import { IcAngleMenu, IcBackgroundMenu, IcFaceMenu, IcJustMenu } from '../../../asset/icon';

const SLIDER_WIDTH = 17;
const SLIDER_HEIGHT = 4.8;

const DragReason = () => {
  const MENU_LIST: JSX.Element[] = [
    <IcFaceMenu key="face" />,
    <IcAngleMenu key="angle" />,
    <IcBackgroundMenu key="background" />,
    <IcJustMenu key="just" />,
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState(false);

  return (
    <StDragWReasonWrapper>
      <StDragWReasonUl currentIdx={currentIdx} transX={transX}>
        {MENU_LIST.map((menu, idx) => (
          <li key={idx}>{menu}</li>
        ))}
      </StDragWReasonUl>
    </StDragWReasonWrapper>
  );
};

export default DragReason;

const StDragWReasonWrapper = styled.section`
  width: ${SLIDER_WIDTH}rem;
  height: ${SLIDER_HEIGHT}rem;
`;
const StDragWReasonUl = styled.ul<{ currentIdx: number; transX: number }>`
  display: flex;
  flex-direction: row;

  gap: 0.9rem;

  transform: ${({ currentIdx, transX }) => `translateX(${-currentIdx * SLIDER_WIDTH + transX}px);`};

  & > li {
    draggable: false;
  }
`;
