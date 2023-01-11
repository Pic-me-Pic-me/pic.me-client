import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcErrorLogo } from '../../asset/icon';

const Error = () => {
  const navigate = useNavigate();
  return (
    <StErrorWrapper>
      <IcErrorLogo />
      <p>해당 페이지를 찾을 수 없어요.</p>
      <p> 올바른 URL을 입력했는지 확인해주세요!</p>
      <StPlayerBtn onClick={() => navigate('/')}>홈으로 돌아가기</StPlayerBtn>
    </StErrorWrapper>
  );
};

export default Error;

const StErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  & > svg {
    margin-bottom: 3rem;
  }
  & > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
  }
`;

const StPlayerBtn = styled.button`
  width: 92%;
  height: 5.8rem;
  margin-top: 18.1rem;

  border: none;
  border-radius: 0.9rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
`;
