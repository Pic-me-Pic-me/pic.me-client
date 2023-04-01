import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export interface HamburgerProps {
  isOpen: boolean;
}

const Hamburger = ({ isOpen }: HamburgerProps) => {
  const navigate = useNavigate();

  return (
    <StHamburgerWrapper isOpen={isOpen}>
      <StHamburgerMenu
        onClick={() => {
          navigate('/mypage');
        }}>
        회원 정보
      </StHamburgerMenu>
      <StHamburgerMenu
        onClick={() => {
          navigate('/library');
        }}>
        라이브러리
      </StHamburgerMenu>
    </StHamburgerWrapper>
  );
};

export default Hamburger;

const StHamburgerWrapper = styled.ul<{ isOpen?: boolean }>`
  position: fixed;
  left: 0;
  z-index: -10;

  width: 100%;
  height: 14.5rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  transition: 0.3s ease;

  ${({ isOpen }) =>
    isOpen
      ? css`
          top: 7.674rem;
        `
      : css`
          top: -100%;

          transition: 2s ease;
        `}
`;

const StHamburgerMenu = styled.li`
  padding: 2rem 2.8rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3};

  & > a {
    display: block;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3};
  }

  cursor: pointer;
`;
