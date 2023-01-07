import React from 'react';
import styled from 'styled-components';

export interface ModalProps {
  isShowing: boolean;
  message: string;
  handleHide: React.MouseEventHandler;
  handleConfirm: React.MouseEventHandler;
  isFinishing?: boolean; // 투표 마감하기 버튼
}

const Modal = (props: ModalProps) => {
  const { isShowing, message, handleHide, handleConfirm, isFinishing } = props;
  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <StModalContent>{message}</StModalContent>
            <StModalSubContent isFinishing={isFinishing}>
              *마감된 투표는 <span>라이브러리</span>에서 확인 가능해요!
            </StModalSubContent>
            <StButtonWrapper>
              <button type="button" onClick={handleHide}>
                취소
              </button>
              <button type="button" onClick={handleConfirm}>
                확인
              </button>
            </StButtonWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default Modal;

const StModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  z-index: 100;
`;

const StModal = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 31rem;
  height: 19.6rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;
`;

const StModalContent = styled.p`
  margin-top: 7.4rem;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
`;

const StModalSubContent = styled.p<{ isFinishing?: boolean }>`
  display: ${({ isFinishing }) => (isFinishing ? 'block' : 'none')};
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.1rem;
  > span {
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  gap: 1.2rem;
  padding: 2.1rem 2.3rem;
  > button {
    width: 12.6rem;
    height: 4.1rem;
    background: inherit;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
    border: none;
    border-radius: 1rem;
  }
  button:last-child {
    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;
