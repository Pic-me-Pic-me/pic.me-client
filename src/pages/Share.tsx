import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isAndroid, isIOS } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcShareBtn } from '../asset/icon';
import { ImgShareCapture } from '../asset/image';
import { HeaderLayout } from '../components/Layout';

const Share = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isToastOn, setIsToastOn] = useState<boolean>(false);

  const voteId = location.state;

  const handleToast = () => {
    setIsToastOn(true);
    setTimeout(() => setIsToastOn(false), 2000);
  };

  const handleDeepLink = () => {
    if (isIOS) {
      window.location.replace('instagram-stories://share');
    } else if (isAndroid) {
      window.location.replace('intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end');
    } else {
      window.location.replace('https://www.instagram.com/');
    }
  };

  return (
    <>
      <HeaderLayout HeaderTitle="투표 링크 공유" handleGoback={() => navigate('/')} />
      {isToastOn && <StShareToast>링크가 복사되었습니다!</StShareToast>}
      <StShareWrapper>
        <StShareTitle>
          <h1>가이드 라인</h1>
          <h2>아래 가이드 라인을 따라 나만의 투표를 공유해보세요!</h2>
        </StShareTitle>
        <StShareInfo>
          <input type="text" defaultValue={`http://localhost:3000/vote/${voteId}`} />
          <CopyToClipboard text={`http://localhost:3000/vote/${voteId}`}>
            <button type="button" onClick={handleToast}>
              <IcShareBtn />
            </button>
          </CopyToClipboard>
        </StShareInfo>
        <StCaptureScreen>
          <p>* 하단 이미지를 꾹 눌러 저장한 뒤 SNS에 공유해보세요!</p>
          <img src={ImgShareCapture} alt="캡쳐 이미지" />
        </StCaptureScreen>
        <StBtnLayout>
          <StGoInstagramBtn type="button" onClick={handleDeepLink}>
            인스타그램으로 공유해보기
          </StGoInstagramBtn>
          <StGoHomeBtn type="button" onClick={() => navigate('/')}>
            홈으로 가기
          </StGoHomeBtn>
        </StBtnLayout>
      </StShareWrapper>
    </>
  );
};
export default Share;

const StShareWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;
`;

const StShareTitle = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  padding-left: 2rem;
  padding-right: 2rem;

  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  & > h2 {
    margin-top: 0.9rem;

    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;

const StShareInfo = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 3.9rem;
  padding-left: 2rem;
  padding-right: 2rem;

  & > input {
    width: 100%;
    height: 5rem;

    padding: 0 1.584rem 0 1.4rem;

    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

    border: none;
    border-radius: 0.8rem;

    text-overflow: ellipsis;
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 0.9rem;

    width: 6.2rem;
    height: 5rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

    border: none;
    border-radius: 0.8rem;
  }
`;

const StCaptureScreen = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3.9rem;

  & > p {
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  & > img {
    margin-top: 2rem;

    width: 100%;
  }
`;

const StBtnLayout = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;

  margin-top: 3.867rem;
  padding-bottom: 12.7rem;
`;

const StBtnStructure = styled.button`
  width: 100%;
  height: 6rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  border: none;
  border-radius: 0.9rem;
`;

const StGoInstagramBtn = styled(StBtnStructure)`
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;

const StGoHomeBtn = styled(StBtnStructure)`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;

const StShareToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  top: 80%;
  left: 50vw;
  transform: translateX(-50%);

  width: 24.8rem;
  height: 4.8rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  border-radius: 4.6rem;

  /* animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: fadeOut; */
`;
