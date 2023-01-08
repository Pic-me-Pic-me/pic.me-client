import styled, { css } from 'styled-components';

import { IcSelectRound } from '../../../asset/icon';
import { useCarouselSize } from '../../../lib/hooks/useCarouselSize';
import { loading } from '../../common/style/animation';

const LandingReasonSlider = () => {
  const { ref } = useCarouselSize();

  return (
    <StReasonSliderWrapper>
      <StDragWReasonWrapper ref={ref}>
        <StDragWReason currentIdx={0} dragItemWidth={170}>
          <p className="zero_select_item"></p>
          <p></p>
          <p className="unselect_item"></p>
        </StDragWReason>
      </StDragWReasonWrapper>
      <StSelectRoundNav>
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <IcSelectRound key={`${idx}unselect_round1`} fill="#E8EBEF" />
          ))}
      </StSelectRoundNav>
    </StReasonSliderWrapper>
  );
};

export default LandingReasonSlider;
const StReasonSliderWrapper = styled.section`
  position: absolute;
  top: 60rem;

  width: 100%;
`;
const StDragWReasonWrapper = styled.article`
  overflow: hidden;
`;
const StDragWReason = styled.div<{ currentIdx: number; dragItemWidth: number }>`
  display: flex;
  width: 100%;

  gap: 1.7rem;

  & > p {
    width: 17rem;
    height: 4.8rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 2.45rem;
    animation: ${loading} 2s infinite linear;
  }
  & > .zero_select_item {
    visibility: hidden;
  }
  & > .unselect_item {
    opacity: 0.5;
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
