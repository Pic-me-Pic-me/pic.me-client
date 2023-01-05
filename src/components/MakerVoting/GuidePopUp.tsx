import styled from 'styled-components';

import { IcHand, IcMoveCrop } from '../../asset/icon';

const GuidePopUp = () => (
  <StGuidePopUpWrapper>
    <IcHand />
    <IcMoveCrop />
    <StGuideText>
      사진을 좌우, 상하로 움직여 <br /> 위치를 조정해보세요!
    </StGuideText>
  </StGuidePopUpWrapper>
);

export default GuidePopUp;

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

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  z-index: 1000;
  opacity: 0.7;

  svg {
    margin-bottom: 3.142rem;
  }
`;

const StGuideText = styled.p`
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20};

  text-align: center;
`;
