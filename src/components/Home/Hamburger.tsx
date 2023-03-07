import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export interface HamburgerProps {
  isOpen: boolean;
}

const Hamburger = React.forwardRef<HTMLUListElement, HamburgerProps>(({ isOpen }, ref) => {
  const navigate = useNavigate();

  return (
    <>
      <StOutsideHamburger isOpen={isOpen}>
        <StHamburgerWrapper isOpen={isOpen} ref={ref}>
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
      </StOutsideHamburger>
    </>
  );
});
Hamburger.displayName = 'Hamburger';

export default Hamburger;

const StOutsideHamburger = styled.div<{ isOpen?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 9rem;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: ${(props) => (props.isOpen ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)')};
`;

const StHamburgerWrapper = styled.ul<{ isOpen?: boolean }>`
  position: fixed;
  left: 0;

  width: 100%;
  height: 14.5rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  transition: 0.5s ease;

  ${({ isOpen }) =>
    isOpen
      ? css`
          top: 8.8rem;
        `
      : css`
          top: -200%;

          transition: 2s ease;
        `}
`;

const StHamburgerMenu = styled.li`
  padding: 2rem 2.8rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.1rem;

  & > a {
    display: block;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.1rem;
    text-decoration: none;
  }

  cursor: pointer;
`;
