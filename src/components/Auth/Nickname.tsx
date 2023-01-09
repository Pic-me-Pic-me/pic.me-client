import React from 'react';

import { deleteUser } from '../../lib/api/auth';

const Kakao = window.Kakao;

const Nickname = () => {
  const handleLogout = async () => {
    try {
      const res = await Kakao.Auth.logout();
      localStorage.removeItem('accessToken');
      console.log(Kakao.Auth.getAccessToken()); // null
    } catch (error) {
      console.log('Not logged in.');
    }
  };

  const handleUnLink = async () => {
    try {
      const res = await Kakao.API.request({
        url: '/v1/user/unlink',
      });
      localStorage.removeItem('accessToken');
      const result = await deleteUser();
      console.log(result);
      console.log('unlink'); // null
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
