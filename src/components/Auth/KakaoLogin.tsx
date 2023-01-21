import { useEffect } from 'react';
import styled from 'styled-components';

import { IcKakaoLogin } from '../../asset/icon';

const Kakao = window.Kakao;

const KakaoLogin = () => {
  const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;

  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_JS_KEY);
    }
  };

  return (
    <StKakaoLoginBtn href={kauthUrl}>
      <IcKakaoLogin />
    </StKakaoLoginBtn>
  );
};

export default KakaoLogin;

const StKakaoLoginBtn = styled.a`
  display: flex;
  width: 100%;
  background-color: #fee500;
  border-radius: 0.9rem;
  object-fit: cover;

  > svg {
    width: 100%;
    height: 6rem;

    border-radius: 0.9rem;
    object-fit: cover;
  }
`;
