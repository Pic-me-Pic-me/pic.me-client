import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { postKakaoSignIn, postKakaoSignUp, postKakaoToken } from '../../lib/api/auth';

const Auth = () => {
  const cookies = new Cookies();

  const Kakao = window.Kakao;
  const REDIRECT_URL = `http://localhost:3000/login/oauth/kakao/callback`;

  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: REDIRECT_URL,
      code,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      // Kakao Javascript SDK 초기화
      Kakao.init(process.env.REACT_APP_REST_API_KEY);
      // access token 설정
      Kakao.Auth.setAccessToken(res.data.access_token);
      process.env.BEARER = res.data.access_token;
      console.log(res.data.access_token);

      // 카카오 아이디 있는지 확인
      const data = await postKakaoToken('kakao', res.data.access_token);

      if (data.isUser) {
        // 로그인
        const signInData = await postKakaoSignIn(data.uid, 'kakao');
        // 토큰 저장
        localStorage.setItem('accessToken', signInData.accessToken);
        // cookies.set('refreshToken', res.data.refreshToken);
        localStorage.setItem('refreshToken', signInData.refreshToken);
        navigate('/nickname');
      } else if (!data.isUser) {
        // 회원가입
        const nick = '테스트닉네임';
        // 유저가 아니라면 회원가입하기
        const signUpData = await postKakaoSignUp(data.uid, 'kakao', data.email, nick);
        const resp = signUpData.data.userName;
        navigate('/nickname');
      }

      // const nick = '바켜언지';
      // // 유저가 아니라면 회원가입하기
      // const signUpData = await postKakaoSignUp(uid, 'kakao', nick);
      // const resp = signUpData.data.userName;

      // 카카오 아이디 있는 경우
      // if (isUser) {
      //   const signInData = await postKakaoSignIn(uid, 'kakao');
      //   const nickname = signInData.userName;
      //   localStorage.setItem('accessToken', signInData.accessToken);
      //   localStorage.setItem('refreshToken', signInData.refreshToken);
      //   navigate('/nickname');
      // } else {
      //   const nick = '바켜언지';
      //   // 유저가 아니라면 회원가입하기
      //   const signUpData = await postKakaoSignUp(uid, 'kakao', nick);
      //   const resp = signUpData.data.userName;
      // }
    } catch (err) {
      console.error(err);
    }
  };

  return null;
};

export default Auth;
