import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcClose, IcHamburger, IcHomeLogo } from '../../asset/icon';
import useModal from '../../lib/hooks/useModal';
import useOnClickOutside from '../../lib/hooks/useOnClickOutside';
import { clearUserSession } from '../../lib/token';
import Modal from '../common/Modal';
import Hamburger from './Hamburger';

const Nav = () => {
  const { isShowing, toggle } = useModal();
  const [hamburger, setHamburger] = useState(false);
  const sidebarRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      clearUserSession();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleHamburger = () => {
    setHamburger((hamburger) => !hamburger);
  };

  const handleClickOutside = () => {
    setHamburger(false);
  };

  useOnClickOutside({ ref: sidebarRef, handler: handleClickOutside });

  return (
    <>
      <StOutsideNav isOpen={hamburger} />
      <StNavWrapper ref={sidebarRef}>
        <StNavBar>
          <StLogoBtn
            onClick={() => {
              window.location.reload();
            }}>
            <IcHomeLogo />
          </StLogoBtn>
          <StButtonWrapper>
            <StLogoutBtn type="button" onClick={toggle}>
              로그아웃
            </StLogoutBtn>
            <Modal
              isShowing={isShowing}
              message="로그아웃 하시겠습니까?"
              handleHide={toggle}
              handleConfirm={handleLogout}
            />
            <StHamburgerBtn type="button" onClick={handleHamburger}>
              {hamburger ? <IcClose /> : <IcHamburger />}
            </StHamburgerBtn>
          </StButtonWrapper>
        </StNavBar>
        <Hamburger isOpen={hamburger} />
      </StNavWrapper>
    </>
  );
};

export default Nav;

const StOutsideNav = styled.div<{ isOpen?: boolean }>`
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

const StNavWrapper = styled.nav`
  display: flex;

  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 5.58rem;
  margin-top: 2.093rem;
  padding-left: 1.308rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StNavBar = styled(StNavWrapper)``;

const StLogoBtn = styled.a`
  cursor: pointer;

  > svg {
    width: 11.1rem;
    height: 5.4rem;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
`;

const StLogoutBtn = styled.button`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}

  background: inherit;
  border: none;
`;

const StHamburgerBtn = styled.button`
  width: 6.6rem;
  height: 6.6rem;
  padding: 0;

  background: inherit;
  border: none;

  > svg {
    width: 2.133rem;
    height: 1.4rem;
  }
`;
