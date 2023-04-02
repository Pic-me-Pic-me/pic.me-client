import styled from 'styled-components';

const StickerGuide = () => (
  <StStickerGuideWrapper>
    <article>
      <h2>붙이기 시작!</h2>
      <p>화면을 터치하면 투표가 시작됩니다!</p>
    </article>
  </StStickerGuideWrapper>
);

export default StickerGuide;

const StStickerGuideWrapper = styled.article`
  width: 100%;
  & > article {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    position: absolute;
    left: 5%;
    top: 0rem;

    width: 90%;
    height: 52rem;

    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    object-fit: cover;
    & > h2 {
      margin-bottom: 0.5rem;
      ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1}
    }
    & > p {
      ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}
    }
  }

  z-index: 2;
`;
