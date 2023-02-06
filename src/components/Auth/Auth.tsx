import axios from 'axios';
import qs from 'qs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postKakaoSignIn, postKakaoToken } from '../../lib/api/auth';
import Cookie from '../../lib/cookies';
import LocalStorage from '../../lib/localStorage';

const Kakao = window.Kakao;

const Auth = () => {
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
      const { data: kakaoRes } = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      Kakao.init(process.env.REACT_APP_REST_API_KEY);

      Kakao.Auth.setAccessToken(kakaoRes.access_token);
      LocalStorage.setItem('kakaoAccessToken', kakaoRes.access_token);

      // 카카오 중복확인
      const data = await postKakaoToken(kakaoRes.access_token);
      if (data.isUser) {
        // 로그인
        const signInData = await postKakaoSignIn(data.uid);
        LocalStorage.setItem('accessToken', signInData.accessToken);
        Cookie.setItem('refreshToken', signInData.refreshToken);
        navigate('/home');
        window.location.reload();
      } else if (!data.isUser) {
        // 회원가입
        navigate('/signup/kakaonickname', { state: { uid: data.uid, email: data.email } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return null;
};

export default Auth;
