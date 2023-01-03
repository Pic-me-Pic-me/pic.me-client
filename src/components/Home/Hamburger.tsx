import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface HambergerProps {
  isOpen: boolean;
}
const Hamburger = (props: HambergerProps) => {
  const { isOpen } = props;
  const navigate = useNavigate();

  const handleNavigateLibrary = () => {
    navigate('/library');
  };

  return (
    <StHamburgerWrapper isOpen={isOpen}>
      <StHamburgerMenu>회원 정보</StHamburgerMenu>
      <StHamburgerMenu onClick={handleNavigateLibrary}>라이브러리</StHamburgerMenu>
      <StHamburgerMenu>픽미 팀소개</StHamburgerMenu>
    </StHamburgerWrapper>
  );
};

export default Hamburger;
const StHamburgerWrapper = styled.ul<{ isOpen?: boolean }>`
  position: fixed;
  z-index: 10;

  width: 43rem;
  height: 20.3rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  transition: 0.5s ease;

  ${({ isOpen }) =>
    isOpen
      ? css`
          top: 8.8rem;

          transition: 0.5s ease;
        `
      : css`
          top: -20%;

          transition: 0.5s ease;
        `}
`;

const StHamburgerMenu = styled.li`
  padding: 2rem 0rem 2rem 2.8rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
`;
