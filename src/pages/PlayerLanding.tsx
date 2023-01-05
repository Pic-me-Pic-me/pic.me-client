import React from 'react';
import styled from 'styled-components';

const PlayerLanding = () => (
  <StModalWrapper>
    <StModal>
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
  margin: auto;
  width: 31rem;
  height: 19.6rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;
`;

const StButtonWrapper = styled.button`
  width: 25.3rem;
  height: 5.4rem;
`;
