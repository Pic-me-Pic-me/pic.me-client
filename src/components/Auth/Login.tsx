import React from 'react';
import styled, { css } from 'styled-components';

import { kakaologinbtn, LoginBanner, Logo } from '../../asset/image';

const Login = () => (
  <>
    <StBannerWrapper>
      <img src={LoginBanner} alt="로그인 배너" />
    </StBannerWrapper>
    <StWhiteSection>
      <StContainer>
        <StForm>
          <StTitle>로그인</StTitle>
          <StInput type="email" placeholder="이메일을 입력해주세요" />
          <StInput type="password" placeholder="비밀번호를 입력해주세요" />
          <StInputDesc>아이디 또는 비밀번호를 잘못 입력했습니다.</StInputDesc>
          <StAuthBtn type="submit">로그인</StAuthBtn>
        </StForm>
        <StAuthBtn type="submit" isSignUp>
          회원가입
        </StAuthBtn>
        <StKaKaoLogin>
          <StDivider className="line">간편 로그인</StDivider>
          <button type="button">
            <img src={kakaologinbtn} alt="카카오계정으로 계속하기" />
          </button>
        </StKaKaoLogin>
      </StContainer>
    </StWhiteSection>
  </>
);

export default Login;

const StDivider = styled.div`
  padding: 2.4rem 2.4rem 1.6rem 2.4rem;

  &.line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
  &.line::before {
    content: '';
    flex-grow: 1;
    margin-right: 1rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    height: 0.05rem;
    font-size: 0px;
    line-height: 0px;
  }
  &.line::after {
    content: '';
    flex-grow: 1;
    margin-left: 1rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    height: 0.05rem;
    font-size: 0px;
    line-height: 0px;
  }
  > p {
    padding-top: 1.6rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    font-size: 1.5rem;
  }
`;

const StKaKaoLogin = styled.div`
  margin: 0 auto;

  > button {
    background: inherit;
    border: none;
  }
`;

const StBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
`;

const StWhiteSection = styled.section`
  position: fixed;
  bottom: 0;

  width: 43rem;
  height: 75.3rem;

  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StContainer = styled.article`
  display: flex;
  flex-direction: column;

  margin-top: 4.2rem;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;

  padding: 0rem 2rem;

  p:nth-child(4) {
    margin-bottom: 4.6rem;
  }
`;

const StInput = styled.input`
  width: 39rem;
  height: 6rem;
  margin-top: 1.4rem;
  padding-left: 1.9rem;

  border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;

  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;

const StInputDesc = styled.p`
  height: 1.7rem;
  margin-top: 1rem;
  padding-left: 0.9rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  // Pic_Caption2_Pretendard_Semibold_14 로 변경해야함
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
`;

const StAuthBtn = styled.button<{ isSignUp?: boolean }>`
  width: 39rem;
  height: 6rem;

  margin: 0 auto;

  border: none;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  color: white;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  ${({ isSignUp }) =>
    isSignUp &&
    css`
      margin-top: 0.8rem;
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    `}

  > img {
    width: 39rem;
    height: 6rem;
  }
`;

const StTitle = styled.h2`
  margin-top: 2rem;
  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;
