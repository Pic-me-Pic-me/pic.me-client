import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { notificationPermission } from '../../recoil/picme/atom';
import { registerWorker } from '../../utils/setNotification';

export interface MakingVoteModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const PicmeNotificationModal = (props: MakingVoteModalProps) => {
  const { isShowing, handleHide } = props;
  const [isNotificationPermission, setNotificationPermission] = useRecoilState(notificationPermission);

  const handlePermission = async () => {
    console.log('권한 요청 중...', Notification.permission);

    // 알림 권한 받기 전
    if (Notification.permission === 'default') {
      // 요청하기
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        registerWorker(setNotificationPermission).catch((err) => console.error(err));
      } else {
        alert('Please allow notifications.');
      }
    }
    // 승인 - GRANTED
    else if (Notification.permission === 'granted') {
      // registerWorker(setNotificationPermission).catch((err) => console.error(err));
    }
    // 거부 - DENIED
    else {
      alert('알림 권한을 허용해주세요!');
    }
  };

  return (
    <>
      {Notification.permission === 'default' && (
        <StModalWrapper>
          <StModal>
            <StModalContent>
              <p>픽미 알림</p>
            </StModalContent>
            <StModalSubContent>픽미가 제공하는 알림을 허용하시겠습니까?</StModalSubContent>
            <StButtonWrapper>
              <button type="button" onClick={handleHide}>
                거부
              </button>
              <button type="button" onClick={handlePermission}>
                허용
              </button>
            </StButtonWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default PicmeNotificationModal;

const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  padding: 0rem 3.3rem;

  background: rgba(0, 0, 0, 0.7);

  z-index: 10000;
`;

const StModal = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 23.8rem;
  padding: 2.5rem 1.1rem 0.9rem 1.1rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  & > button {
    background: inherit;
    border: none;
    & > svg {
      position: absolute;
      top: 0rem;
      right: 0rem;

      padding: 2.551rem 2.331rem 1.915rem 2.538rem;
      width: 6.2rem;
      height: 5.8rem;
    }
  }
`;

const StModalContent = styled.div`
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;

  & > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1}
  }
`;

const StModalSubContent = styled.p`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;

  padding-top: 2.1rem;
  width: 100%;

  & > button {
    position: relative;

    width: 100%;
    height: 5.6rem;

    background: inherit;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3}
    border: none;
    border-radius: 1rem;

    & > svg {
      position: absolute;
      top: 1.1rem;
      left: 1.6rem;
    }
  }

  & > button:last-child {
    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;
