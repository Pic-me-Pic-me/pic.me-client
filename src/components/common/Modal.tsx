import styled from 'styled-components';

export interface ModalProps {
  isShowing: boolean;
  message: string;
  handleHide: React.MouseEventHandler;
  handleConfirm: React.MouseEventHandler;
  isFinishing?: boolean; // 투표 마감하기 버튼
  isDeleteUser?: boolean; // 탈퇴하기 버튼
}

const Modal = (props: ModalProps) => {
  const { isShowing, message, handleHide, handleConfirm, isFinishing, isDeleteUser } = props;
  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <StModalContent>{message}</StModalContent>
            <StModalSubContent isFinishing={isFinishing}>
              *마감된 투표는 <span>라이브러리</span>에서 확인 가능해요!
            </StModalSubContent>
            <StModalSubContent isDeleteUser={isDeleteUser}>
              *탈퇴시 <span>계정 및 모든 데이터</span>들이 영구 삭제됩니다!
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: 100000;

  width: 100%;
  height: 100%;
  padding: 0rem 6rem;

  background: rgba(0, 0, 0, 0.7);

  z-index: 10000;
`;

const StModal = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  max-width: 43rem;
  padding: 2.1rem 2.3rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;
`;

const StModalContent = styled.p`
  padding-top: 5.3rem;
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
`;

const StModalSubContent = styled.p<{ isFinishing?: boolean; isDeleteUser?: boolean }>`
  display: ${({ isFinishing }) => (isFinishing ? 'block' : 'none')};
  display: ${({ isDeleteUser }) => (isDeleteUser ? 'block' : 'none')};
  margin-top: 0.5rem;
  position: fixed;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};

  > span {
    color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 4rem;
  width: 100%;

  > button {
    width: 100%;
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
