import React from 'react';
import styled from 'styled-components';

import { IcClose, IcFlowerVote, IcNormalVote } from '../../asset/icon';

export interface MakingVoteModalProps {
  isShowing: boolean;
  handleNormalVote: React.MouseEventHandler;
  handleFlowerVote: React.MouseEventHandler;
  handleHide: React.MouseEventHandler;
}

const MakingVoteModal = (props: MakingVoteModalProps) => {
  const { isShowing, handleNormalVote, handleFlowerVote, handleHide } = props;
  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <button type="button" onClick={handleHide}>
              <IcClose />
            </button>
            <StModalContent>
              <p>투표 만들기</p>
            </StModalContent>
            <StModalSubContent>제작할 투표 종류를 선택해주세요!</StModalSubContent>
            <StButtonWrapper>
              <button type="button" onClick={handleNormalVote}>
                <IcNormalVote />
                Pic.me 기본 사진 투표
              </button>
              <button type="button" onClick={handleFlowerVote}>
                <IcFlowerVote />
                EVENT 꽃 인상 테스트
              </button>
            </StButtonWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default MakingVoteModal;

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
  flex-direction: column;
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
