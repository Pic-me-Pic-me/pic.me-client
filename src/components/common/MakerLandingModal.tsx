import React from 'react';
import styled from 'styled-components';

import { IcClose } from '../../asset/icon';

export interface MakerLandingModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const MakerLandingModal = (props: MakerLandingModalProps) => {
  const { isShowing, handleHide } = props;
  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <StTopWrapper>
              <p>신학기 봄 이벤트</p>
              <button type="button" onClick={handleHide}>
                <IcClose />
              </button>
            </StTopWrapper>
            <StModalContent>
              <span>나를 닮은 꽃은?</span>
              <p>테스트 하러가기</p>
            </StModalContent>
            <StModalSubContent>친구들이 보는 내 꽃인상을 확인해보세요!</StModalSubContent>
            <StButtonWrapper>
              <button type="button" onClick={handleHide}>
                취소
              </button>
              <button type="button" onClick={handleHide}>
                확인
              </button>
            </StButtonWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default MakerLandingModal;

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
`;

const StTopWrapper = styled.div`
  & > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_1}
  }
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
  padding-top: 1.8rem;
  padding-bottom: 0.9rem;

  & > span {
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24};
  }
  & > p {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1}
  }
`;

const StModalSubContent = styled.p`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_2};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_1}
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding-top: 2.2rem;
  width: 100%;

  > button {
    width: 100%;
    height: 5.2rem;

    background: inherit;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_3}
    border: none;
    border-radius: 1rem;
  }
  button:last-child {
    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;
