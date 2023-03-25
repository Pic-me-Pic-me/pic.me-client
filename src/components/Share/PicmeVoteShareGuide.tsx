import styled from 'styled-components';

import { ImgShareCapture } from '../../asset/image';

const PicmeVoteShareGuide = () => (
  <StShareGuideWrapper>
    <p>* 하단 이미지를 꾹 눌러 저장한 뒤 SNS에 공유해보세요!</p>
    <img src={ImgShareCapture} alt="캡쳐 이미지" />
  </StShareGuideWrapper>
);

export default PicmeVoteShareGuide;

const StShareGuideWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3.9rem;

  & > p {
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  & > img {
    margin-top: 2rem;

    width: 100%;
  }
`;
