import React from 'react';
import styled from 'styled-components';

import { IcModalLogo } from '../asset/icon';

const PlayerLanding = () => (
  <StModalWrapper>
    <StModal>
      <IcModalLogo />
      <StButtonWrapper>
        <button type="button">익명 투표 시작하기</button>
        <button type="button">홈으로 가기</button>
      </StButtonWrapper>
    </StModal>
  </StModalWrapper>
);

export default PlayerLanding;

const StModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
`;

const StModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  padding-top: 3.8rem;
  margin: auto;
  width: 30.7rem;
  height: 42.3rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  & > svg {
    width: 20rem;
    height: 6.6rem;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  padding-bottom: 2.1rem;

  & > button {
    width: 25.3rem;
    height: 5.4rem;

    border: none;
    border-radius: 0.9rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

    :last-child {
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    }
  }
`;
