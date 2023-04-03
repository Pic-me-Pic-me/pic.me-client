import styled from 'styled-components';

import { IcHand, IcMoveCrop } from '../../../asset/icon';

const CoachMark = () => (
  <StGuidePopUpWrapper>
    <IcHand />
    <IcMoveCrop />
    <StGuideText>
      사진을 좌우, 상하로 움직여 <br /> 위치를 조정해보세요!
    </StGuideText>
  </StGuidePopUpWrapper>
);
export default CoachMark;

const StGuidePopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #000000;

  z-index: 1000;
  opacity: 0.8;

  svg {
    width: 6.473rem;
    height: 6.473rem;
    margin-bottom: 3.142rem;
  }
`;

const StGuideText = styled.p`
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2};

  text-align: center;
`;
