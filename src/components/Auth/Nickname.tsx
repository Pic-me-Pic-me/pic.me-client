import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from '../../lib/api/auth';

const Kakao = window.Kakao;

const Nickname = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await Kakao.Auth.logout();
      localStorage.removeItem('accessToken');
      console.log(Kakao.Auth.getAccessToken()); // null
      // navigate('/login');
    } catch (error) {
      console.log('Not logged in.');
    }
  };

  const handleUnLink = async () => {
    try {
      console.log(Kakao.Auth.getAccessToken());
      const res = await Kakao.API.request({
        url: '/v1/user/unlink',
      });
      console.log('4) 연결 끊기 결과 : ', res);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('KakaoAcessToken')}`;
      // const res = axios.post('https://kapi.kakao.com/v1/user/unlink');

      const result = await deleteUser();
      console.log('5) 서비스 탈퇴 처리 결과 : ', result);

      // navigate('/login');
      // localStorage.removeItem('accessToken');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      닉네임 설정 화면
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleUnLink}>탈퇴하기</button>
    </div>
  );
};

export default Nickname;
