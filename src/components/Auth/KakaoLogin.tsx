import react, { useEffect } from 'react';
import styled from 'styled-components';

import { KakaoLoginBtn } from '../../asset/image';

const KakaoLogin = () => {
  const Kakao = window.Kakao;
  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;

  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_JS_KEY);
      console.log(Kakao.isInitialized());
    }
  };

  return (
    <StKakaoLoginBtn href={kauthUrl}>
      <img src={KakaoLoginBtn} alt="카카오 로그인" />
    </StKakaoLoginBtn>
  );
};

export default KakaoLogin;

const StKakaoLoginBtn = styled.a`
  background: inherit;
  border: none;

  > img {
    width: 39rem;
    height: 6rem;
  }
`;
