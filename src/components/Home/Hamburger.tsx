import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface HamburgerProps {
  isOpen: boolean;
}
const Hamburger = (props: HamburgerProps) => {
  const { isOpen } = props;
  const [showOption, setShowOption] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const handleToggleOption = () => setShowOption((prev) => !prev);

  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(ref?.current.contains(e?.target));
    if (showOption && !ref.current.contains(e.target)) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    if (showOption) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });
  const navigate = useNavigate();

  const handleNavigateLibrary = () => {
    navigate('/library');
  };

  return (
    <StOutsideHamburger onClick={handleClickOutSide}>
      <StHamburgerWrapper isOpen={isOpen}>
        <StHamburgerMenu>회원 정보</StHamburgerMenu>
        <StHamburgerMenu onClick={handleNavigateLibrary}>라이브러리</StHamburgerMenu>
        <StHamburgerMenu>픽미 팀소개</StHamburgerMenu>
      </StHamburgerWrapper>
    </StOutsideHamburger>
  );
};

export default Hamburger;

const StOutsideHamburger = styled.div``;

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
`;
