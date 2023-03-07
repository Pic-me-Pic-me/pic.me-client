import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcClose, IcHamburger, IcHomeLogo } from '../../asset/icon';
import useModal from '../../lib/hooks/useModal';
import useOnClickOutside from '../../lib/hooks/useOnClickOutside';
import { clearUserSession } from '../../lib/token';
import { hamburgerState } from '../../recoil/maker/atom';
import Modal from '../common/Modal';
import Hamburger from './Hamburger';

const Nav = () => {
  const { isShowing, toggle } = useModal();
  const [hamburger, setHamburger] = useRecoilState(hamburgerState);
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

  const handleReLoad = () => {
    window.location.reload();
  };

  const handleClickOutside = (event: Event) => {
    setHamburger(false);
  };

  useOnClickOutside({ ref: sidebarRef, handler: handleClickOutside });

  return (
    <>
      <StHomeNav>
        <StLogoBtn onClick={handleReLoad}>
          <IcHomeLogo />
        </StLogoBtn>
        <StHamburgerWrapper>
          <StLogoutBtn type="button" onClick={() => toggle()}>
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
        </StHamburgerWrapper>
        <Hamburger isOpen={hamburger} ref={sidebarRef} />
      </StHomeNav>
    </>
  );
};

export default Nav;

const StHomeNav = styled.nav`
  display: flex;

  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 8.8rem;
  padding: 2.7rem 0rem 0rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StLogoBtn = styled.a`
  cursor: pointer;

  > svg {
    width: 11.1rem;
    height: 5.4rem;
  }
`;

const StHamburgerWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
`;

const StLogoutBtn = styled.button`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

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
