import React from 'react';
import styled from 'styled-components';

import { IcHamburger } from '../../asset/icon';
import { HomeLogo } from '../../asset/image';

const Nav = () => (
  <StHomeNav>
    <img src={HomeLogo} alt="홈 로고" />
    <StHambergerWrapper>
      <StLogoutBtn type="button">로그아웃</StLogoutBtn>
      <StHamburgerBtn type="button">
        <IcHamburger width="2.13rem" height="1.4rem" />
      </StHamburgerBtn>
    </StHambergerWrapper>
  </StHomeNav>
);

export default Nav;

const StHomeNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 8.8rem;
  padding: 2.7rem 0rem 0.7rem 1.8rem;

  > img {
    width: 11.1rem;
    height: 5.4rem;
  }
`;

const StHambergerWrapper = styled.div`
  display: flex;
  align-items: center;
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
`;
