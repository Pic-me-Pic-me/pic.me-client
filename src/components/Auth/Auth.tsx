import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { postKakaoSignIn, postKakaoSignUp, postKakaoToken } from '../../lib/api/auth';

const Kakao = window.Kakao;

const AuthComponent = () => {
  const cookies = new Cookies();

  // const REDIRECT_URL = `https://with-picme.com/login/oauth/kakao/callback`;
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
      code,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    });
    try {
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      Kakao.init(process.env.REACT_APP_REST_API_KEY);
      Kakao.Auth.setAccessToken(res.data.access_token);
      localStorage.setItem('kakaoAccessToken', res.data.access_token);

      // 카카오 중복확인
      const data = await postKakaoToken('kakao', res.data.access_token);
      if (data.isUser) {
        // 로그인
        const signInData = await postKakaoSignIn(data.uid, 'kakao');
        localStorage.setItem('accessToken', signInData.accessToken);
        cookies.set('refreshToken', signInData.refreshToken, { httpOnly: true });
        navigate('/home');
        window.location.reload();
      } else if (!data.isUser) {
        // 회원가입
        navigate('/signup/kakaonickname', { state: { uid: data.uid, socialType: 'kakao', email: data.email } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return null;
};

export default AuthComponent;
