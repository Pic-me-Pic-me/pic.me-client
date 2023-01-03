import React from 'react';
import styled, { css } from 'styled-components';

import { kakaologinbtn, logo } from '../../asset/image';

const Login = () => (
  <>
    <StLoginHeader>
      <img src={logo} alt="로고" />
    </StLoginHeader>
    <StLoginForm>
      <h1>로그인</h1>
      <StLoginInput type="email" placeholder="이메일을 입력해주세요" />
      <StLoginInput type="password" placeholder="비밀번호를 입력해주세요" />
      <StAuthBtn type="submit">로그인</StAuthBtn>
    </StLoginForm>
    <StSignUpWrapper>
      <StAuthBtn type="submit" isSignUp>
        회원가입
      </StAuthBtn>
      <p>간편 로그인</p>
      <StAuthBtn type="submit">
        <img src={kakaologinbtn} alt="카카오계정으로 계속하기" />
      </StAuthBtn>
    </StSignUpWrapper>
  </>
);

export default Login;

const StLoginHeader = styled.header`
  height: 22.1rem;

  padding: 5.3rem 0rem 0rem 2rem;

  > img {
    margin-bottom: 5.5rem;
  }
`;

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: 0rem 2rem;

  > h1 {
    margin-bottom: 2.7rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
  }

  > p {
    margin-top: 2.4rem;
    margin-bottom: 1.7rem;
  }

  input:nth-child(3) {
    margin-bottom: 8.8rem;
  }
`;

const StLoginInput = styled.input`
  padding-bottom: 0.8rem;
  margin-bottom: 2.2rem;

  height: 2.9rem;

  border: none;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18}

  &::placeholder {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18}
  }

  &:focus {
    outline: none;
  }
`;

const StAuthBtn = styled.button<{ isSignUp?: boolean }>`
  width: 100%;
  height: 60px;

  margin-bottom: 8px;
  padding: 0;

  border: none;
  border-radius: 9px;
  color: white;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  font-size: 16px;

  ${({ isSignUp }) =>
    isSignUp &&
    css`
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    `}

  > img {
    width: 39rem;
    height: 6rem;
  }
`;

const StSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0rem 2rem;

  > p {
    margin: 0 auto;

    padding-top: 1.6rem;
    padding-bottom: 1.7rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    font-size: 1.5rem;
  }
`;
