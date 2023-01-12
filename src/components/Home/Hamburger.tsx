import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Hamburger = (props: HamburgerProps) => {
  const { isOpen, setIsOpen } = props;

  const sidebarRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const onClickOutSide = (event: Event) => {
    if (!sidebarRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutSide, true);
    return () => {
      document.removeEventListener('click', onClickOutSide, true);
    };
  });

  return (
    <>
      <StOutsideHamburger isOpen={isOpen}>
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
          <StHamburgerMenu>
            <a href="https://www.notion.so/Team-Pic-me-e24dfca43b6b4ed296556f835e7662eb">픽미 팀소개</a>
          </StHamburgerMenu>
        </StHamburgerWrapper>
      </StOutsideHamburger>
    </>
  );
};

export default Hamburger;

const StOutsideHamburger = styled.div<{ isOpen?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;

  background-color: ${(props) => (props.isOpen ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)')};
`;

const StHamburgerWrapper = styled.ul<{ isOpen?: boolean }>`
  position: fixed;
  left: 0;

  width: 100%;
  height: 20.3rem;

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
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.1rem;

  & > a {
    display: block;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.1rem;
    text-decoration: none;
  }

  cursor: pointer;
`;
