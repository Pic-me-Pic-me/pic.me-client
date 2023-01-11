import styled from 'styled-components';

const StickerGuide = () => (
  <StStickerGuideWrapper>
    <article>
      <h2>붙이기 시작!</h2>
      <p>!! 한번 붙이면 다시 붙일 수 없어요!!</p>
      <p>!!기회는 3번뿐!!</p>
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
    top: 17.5rem;

    width: 90%;
    height: 52rem;

    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    object-fit: cover;
    & > h2 {
      margin-bottom: 3rem;
      ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
    }
    & > p {
      ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
    }
  }

  z-index: 2;
`;
