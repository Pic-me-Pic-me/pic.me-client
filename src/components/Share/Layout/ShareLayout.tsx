import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isAndroid, isIOS } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcShareBtn } from '../../../asset/icon';
import Error404 from '../../../pages/Error404';
import { HeaderLayout } from '../../Layout';
import FlowerShareGuide from '../FlowerShareGuide';
import PicmeVoteShareGuide from '../PicmeVoteShareGuide';

interface ShareLayoutProps {
  isFlowerVote: boolean;
}

const ShareLayout = (props: ShareLayoutProps) => {
  const { isFlowerVote } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [isToastOn, setIsToastOn] = useState<boolean>(false);

  const voteId = location.state.voteId;
  const voteUrl = `https://with-picme.com/vote/${voteId}`;

  const handleToast = () => {
    setIsToastOn(true);
    setTimeout(() => setIsToastOn(false), 2000);
  };

  const handleDeepLink = () => {
    if (isIOS) {
      return window.location.replace('https://www.instagram.com/create/story');
    }
    if (isAndroid) {
      return window.location.replace('intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end');
    }
    window.location.replace('https://www.instagram.com/');
  };

  if (!voteId) {
    return <Error404 />;
  }

  return (
    <>
      <HeaderLayout HeaderTitle="투표 링크 공유" handleGoback={() => navigate('/home')} />
      <StShareToast style={{ opacity: isToastOn ? 1 : 0 }}>링크가 복사되었습니다!</StShareToast>
      <StShareWrapper>
        <StShareTitle>
          <h1>가이드 라인</h1>
          {isFlowerVote ? (
            <h2>투표를 공유해 친구들이 골라주는 내 꽃인상을 확인하세요!</h2>
          ) : (
            <h2>아래 가이드라인을 따라 나만의 투표를 공유해보세요!</h2>
          )}
        </StShareTitle>
        <StShareInfo>
          <input type="text" defaultValue={voteUrl} readOnly />
          <CopyToClipboard text={voteUrl}>
            <button type="button" onClick={handleToast}>
              <IcShareBtn />
            </button>
          </CopyToClipboard>
        </StShareInfo>
        {isFlowerVote ? <FlowerShareGuide /> : <PicmeVoteShareGuide />}
        <StBtnLayout>
          <StGoInstagramBtn type="button" onClick={handleDeepLink}>
            인스타그램으로 공유해보기
          </StGoInstagramBtn>
          <StGoHomeBtn type="button" onClick={() => navigate('/home')}>
            홈으로 가기
          </StGoHomeBtn>
        </StBtnLayout>
      </StShareWrapper>
    </>
  );
};

export default ShareLayout;

const StShareWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 0.6rem;
`;

const StShareTitle = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  & > h2 {
    margin-top: 0.9rem;

    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;

const StShareInfo = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 0.9rem;
  padding-left: 2.1rem;
  padding-right: 2.1rem;

  & > input {
    width: 100%;
    height: 4.36rem;

    padding: 0 1.584rem 0 1.4rem;

    ${({ theme }) => theme.fonts.Pic_Noto_SB_Subtitle_6}
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

    width: 5.407rem;
    height: 4.36rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

    border: none;
    border-radius: 0.8rem;
  }
`;

const StBtnLayout = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
  padding-left: 1.7rem;
  padding-right: 1.7rem;

  margin-top: 3.867rem;
  padding-bottom: 12.7rem;
`;

const StBtnStructure = styled.button`
  width: 100%;
  height: 6rem;

  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}

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
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
`;
