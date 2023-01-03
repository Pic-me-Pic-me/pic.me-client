import react, { useEffect } from 'react';
import styled from 'styled-components';

import { KakaoLoginBtn } from '../../asset/image';

const KakaoLogin = () => {
  const Kakao = window.Kakao;
  const REDIRECT_URI = `http://localhost:3000/oauth/kakao/callback`;

  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_JS_KEY);
      console.log(Kakao.isInitialized());
    }
  };

  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${REDIRECT_URI}`,
      //TODO: 자동 로그인 구현
      // prompts: 'none',
    });
  };

  return (
    <StKakaoLoginBtn onClick={handleKakaoLogin}>
      <img src={KakaoLoginBtn} alt="카카오 로그인" />
    </StKakaoLoginBtn>
  );
};

export default KakaoLogin;

const StKakaoLoginBtn = styled.button`
  background: inherit;
  border: none;

  > img {
    width: 39rem;
    height: 6rem;
  }
`;
