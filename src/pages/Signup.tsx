import React from 'react';
import styled, { css } from 'styled-components';

import logo from '../asset/icon/picme_logo.svg';
import Input from '../components/SignUp/Input';

const Signup = () => (
  <>
    <StLogo src={logo} />
    <StContainerFrame>
      <StContainer>
        <StTitle>아이디</StTitle>
        <Input />

        <StTitle>비밀번호</StTitle>

        <Input isPwdInput />
        <Input isPwdInput isSecondPwdInput isWrong />

        <StSubmitBtn>계정 만들기</StSubmitBtn>
      </StContainer>
    </StContainerFrame>
  </>
);

const StLogo = styled.img`
  padding: 5.203rem 0rem 0.097rem 2rem;
`;

const StContainerFrame = styled.article`
  display: flex;
  justify-content: center;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.h2`
  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}

  margin-top: 5.3rem;
`;

const StSubmitBtn = styled.button<{ isWrong?: boolean }>`
  width: 39rem;
  height: 5.8rem;

  border-radius: 0.9rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  border: none;

  cursor: pointer;

  margin -top: 15.3rem;

  ${(isWrong) =>
    isWrong &&
    css`
      margin-top: 12.7rem;
    `}
`;

export default Signup;
