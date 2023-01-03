import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const Kakao = window.Kakao;
  const REDIRECT_URI = `http://localhost:3000/oauth/kakao/callback`;

  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
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
      localStorage.setItem('token', res.data.access_token);
      navigate('/nickname');
    } catch (err) {
      console.error(err);
    }
  };

  return null;
};

export default Auth;
