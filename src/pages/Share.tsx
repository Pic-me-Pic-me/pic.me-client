import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcShareBtn } from '../asset/icon';
import { ImgShareCapture } from '../asset/image';

const Share = () => {
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsModal(true);
    setTimeout(() => setIsModal(false), 2000);
  };

  const handleDeepLink = () => {
    window.location.replace('instagram-stories://share');
  };

  return (
    <>
      {isModal && <StShareModal>링크가 복사되었습니다!</StShareModal>}
      <StShareWrapper>
        <StShareTitle>
          <h1>가이드 라인</h1>
          <h2>아래 가이드 라인을 따라 나만의 투표를 공유해보세요!</h2>
        </StShareTitle>
        <StShareInfo>
          <input type="text" defaultValue="https://pic.me/leeji_12/dlssll/dlssl/ksdjfdsgdsdsfasvxz" />
          <CopyToClipboard text="https://pic.me/leeji_12/dlssll/dlssl/ksdjfdsgdsdsfasvxz">
            <button type="button" onClick={handleModal}>
              <IcShareBtn />
            </button>
          </CopyToClipboard>
        </StShareInfo>
        <StCaptureScreen>
          <p>* 하단 화면을 캡쳐해서 SNS 공유에서 사용하세요!</p>
          <ImgShareCapture />
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
  margin-top: 2rem;
`;

const StShareTitle = styled.header`
  margin-left: 2rem;

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
  align-items: center;

  margin: 2rem 0 0 2rem;

  & > input {
    width: 31.9rem;
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
    margin: 2rem;

    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }
`;

const StBtnLayout = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin-top: 3.867rem;
  padding-bottom: 12.7rem;
`;

const StBtnStructure = styled.button`
  width: 39rem;
  height: 6rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  border: none;
`;

const StGoInstagramBtn = styled(StBtnStructure)`
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;

const StGoHomeBtn = styled(StBtnStructure)`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;

const StShareModal = styled.div`
  position: fixed;

  top: 80.8rem;
  left: 9.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 24.8rem;
  height: 4.8rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  border-radius: 4.6rem;
`;
