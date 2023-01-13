import { access } from 'node:fs';

import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcPickmeLogo } from '../../asset/icon';
import { postLoginInfo } from '../../lib/api/auth';
import { LoginInfo } from '../../types/auth';
import KakaoLogin from './KakaoLogin';

const LoginComponent = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [isLoginFail, setIsLoginFail] = useState(false);
  const { register, handleSubmit, getValues } = useForm<LoginInfo>();

  const handleSubmitLoginInfo = () => {
    const { email, password } = getValues();
    postLoginInfo({ email, password }).then((res) => {
      if (res?.data.status === 200) {
        cookies.set('refreshToken', res.data.data.refreshToken, { httpOnly: true });
        localStorage.setItem('accessToken', res.data.data.accessToken);
        if (localStorage.getItem('accessToken')) {
          navigate('/home');
          window.location.reload();
        }
        setIsLoginFail(false);
      } else {
        setIsLoginFail(true);
      }
    });
  };

  return (
    <>
      <StBannerWrapper>
        <IcPickmeLogo />
      </StBannerWrapper>
      <StWhiteSection>
        <StContainer>
          <StForm onSubmit={handleSubmit(handleSubmitLoginInfo)}>
            <StTitle>로그인</StTitle>
            <StInput type="email" {...register('email')} placeholder="이메일을 입력해주세요" />
            <StInput type="password" {...register('password')} placeholder="비밀번호를 입력해주세요" />
            <StInputDesc>{isLoginFail ? '아이디 또는 비밀번호를 잘못 입력했습니다.' : ''}</StInputDesc>
            <StAuthBtn type="submit">로그인</StAuthBtn>
          </StForm>
          <StAuthBtn type="submit" isSignUp onClick={() => navigate('/signup')}>
            회원가입
          </StAuthBtn>
          <StKaKaoLogin>
            <StDivider>간편 로그인</StDivider>
            <KakaoLogin />
          </StKaKaoLogin>
        </StContainer>
      </StWhiteSection>
    </>
  );
};

export default LoginComponent;

const StBannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 22.9rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  > svg {
    position: absolute;
    top: 6.8rem;
  }
`;

const StWhiteSection = styled.section`
  width: 100%;
  padding: 4.2rem 2rem 0rem 2rem;
  margin-top: 17.9rem;
  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;

const StInput = styled.input`
  width: 100%;
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
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  // Pic_Caption2_Pretendard_Semibold_14 로 변경해야함
`;

const StAuthBtn = styled.button<{ isSignUp?: boolean }>`
  width: 100%;
  height: 6rem;
  border: none;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  color: white;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  ${({ isSignUp }) =>
    isSignUp &&
    css`
      /* width: 100%; */
      padding: 0rem 0.2rem;
      margin-top: 0.8rem;
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    `}
  & > button {
    width: 100%;
    height: 6rem;
    & > svg {
      width: 100%;
      height: 6rem;
    }
  }
`;

const StDivider = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100%;
  padding: 2.4rem 2.4rem 1.6rem 2.4rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  > p {
    padding-top: 1.6rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    font-size: 1.5rem;
  }
  &::before {
    content: '';
    flex-grow: 1;
    margin-right: 1rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    height: 0.05rem;
    font-size: 0rem;
    line-height: 0rem;
  }
  &::after {
    content: '';
    flex-grow: 1;
    margin-left: 1rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    height: 0.05rem;
    font-size: 0rem;
    line-height: 0rem;
  }
`;

const StKaKaoLogin = styled.div`
  width: 100%;
`;

const StContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  p:nth-child(4) {
    margin-bottom: 4.6rem;
  }
`;

const StTitle = styled.h2`
  margin-top: 2rem;
  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;
