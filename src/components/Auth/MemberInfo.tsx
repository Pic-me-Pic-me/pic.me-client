import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LoginBanner } from '../../asset/image';
import { deleteUser, postKakaoToken } from '../../lib/api/auth';
import useGetUserData from '../../lib/hooks/useGetUserData';
import useModal from '../../lib/hooks/useModal';
import { clearUserSession, getAccessToken } from '../../lib/token';
import Error404 from '../../pages/Error404';
import { MemberData } from '../../types/auth';
import Modal from '../common/Modal';
import { HeaderLayout } from '../Layout';

const MemberInfo = () => {
  const { userInfo, isError } = useGetUserData();
  const { userName, email } = userInfo as MemberData;
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate('/home');
  };

  const handleDeleteUser = async () => {
    try {
      const KAKAO_TOKEN = getAccessToken('kakaoAccessToken');
      if (KAKAO_TOKEN) {
        await postKakaoToken(KAKAO_TOKEN);
        await axios({
          method: 'POST',
          url: 'https://kapi.kakao.com/v1/user/unlink',
          headers: {
            Authorization: `Bearer ${getAccessToken('kakaoAccessToken')}`,
          },
        });
      }
      await deleteUser();
      clearUserSession();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (isError) return <Error404 />;

  return (
    <>
      <HeaderLayout HeaderTitle="회원 정보" handleGoback={handleGoback} isBanner={true} />
      <StBannerWrapper>
        <img src={LoginBanner} alt="배너" />
      </StBannerWrapper>
      <StWhiteSection>
        <h1>닉네임</h1>
        <p>{userName}</p>
        <h1>아이디</h1>
        {}
        <p>{email}</p>
        <div>
          <button type="button" onClick={toggle}>
            회원 탈퇴하기
          </button>
          <Modal
            isShowing={isShowing}
            message="정말 회원탈퇴 하시겠습니까??"
            handleHide={toggle}
            handleConfirm={handleDeleteUser}
            isDeleteUser
          />
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

  max-width: 43rem;
  width: 100%;

  height: 19.3rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  > img {
    max-width: 100%;
    position: absolute;
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
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
  }

  > p {
    margin-bottom: 3rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Title2_Pretendard_SemiBold_20};
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
