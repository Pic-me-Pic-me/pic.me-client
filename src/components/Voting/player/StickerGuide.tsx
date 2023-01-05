import React from 'react';
import styled from 'styled-components';

const StickerGuide = () => (
  <StStickerGuideWrapper>
    <h2>붙이기 시작!</h2>
    <p>!! 한번 붙이면 다시 붙일 수 없어요!!!!기회는 3번뿐!!</p>
  </StStickerGuideWrapper>
);

export default StickerGuide;

const StStickerGuideWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 2.6rem;

  width: 39rem;
  height: 52rem;
  margin-top: 1.7rem;

  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  object-fit: cover;

  & > h2 {
    margin-bottom: 1.8rem;
    ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_Bold_22}
  }
  & > p {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }
`;
