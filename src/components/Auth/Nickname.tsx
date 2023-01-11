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
      navigate('/makerlanding');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLink = async () => {
    try {
      const res = await Kakao.API.request({
        url: '/v1/user/unlink',
      });
      const result = await deleteUser();
      localStorage.removeItem('accessToken');
      navigate('/makerlanding');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      닉네임 설정 화면 (로그아웃, 탈퇴 TEST용)
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleUnLink}>탈퇴하기</button>
    </div>
  );
};

export default Nickname;
