import styled from 'styled-components';

import { IcFlowerShareGuide } from '../../asset/icon';

const FlowerShareGuide = () => (
  <StFlowerShareGuideWrapper>
    <IcFlowerShareGuide />
    <p>
      *총 <span>10명</span>의 투표가 이루어지면
      <br />
      위와 같은 결과페이지가 <span>라이브러리에</span> 저장됩니다!
    </p>
  </StFlowerShareGuideWrapper>
);

export default FlowerShareGuide;

const StFlowerShareGuideWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5.77rem;

  & > p {
    text-align: center;

    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

    & > span {
      ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_2}
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    }
  }

  & > img {
    margin-top: 2rem;

    width: 100%;
  }
`;
