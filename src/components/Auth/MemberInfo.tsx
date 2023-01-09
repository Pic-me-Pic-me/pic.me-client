import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcPickmeLogo } from '../../asset/icon';
import { getUserInfo } from '../../lib/api/auth';
import { UserInfo } from '../../types/auth';
import { HeaderLayout } from '../Layout';

const MemberInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo>();

  const handleGoback = () => {
    navigate('/');
  };

  const getUserData = async () => {
    const userinfo = await getUserInfo();
    if (userinfo) setUser(userinfo.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <HeaderLayout HeaderTitle="회원 정보" handleGoback={handleGoback} isBanner={true} />
      <StBannerWrapper>
        <IcPickmeLogo />
      </StBannerWrapper>
      <StWhiteSection>
        <h1>닉네임</h1>
        <p>{user?.userName}</p>
        <h1>아이디</h1>
        <p>{user?.email}</p>
        <div>
          <button type="button">회원 탈퇴하기</button>
        </div>
      </StWhiteSection>
    </>
  );
};

export default MemberInfo;

const StBannerWrapper = styled.div`
  display: flex;
  justify-content: center;

  position: absolute;
  top: 0;
  z-index: -1;

  width: 100%;
  height: 22.9rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  > svg {
    position: absolute;
    top: 9.2rem;
  }
`;

const StWhiteSection = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 5.6rem 3rem 0rem 3rem;
  margin-top: 9.5rem;

  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  > h1 {
    margin-bottom: 0.9rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    // body2로 바꿔야 함!!
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }

  > p {
    margin-bottom: 3rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_Bold_20};
  }

  > div {
    display: flex;

    margin-top: 34.6rem;
  }

  > div > button {
    margin: 0 auto;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    background: inherit;
    border: none;
  }
`;
