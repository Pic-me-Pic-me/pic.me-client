import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Ballon } from '../../asset/image';
import { VoteProps } from '../../types/vote';

const FinishedLanding = ({ vote }: VoteProps) => {
  const { voteTitle } = vote;
  const navigate = useNavigate();

  const handleGoToLanding = () => {
    navigate('/makerlanding');
  };

  return (
    <StModalWrapper>
      <StModal>
        <StTitle>
          <div>
            <h1>“{voteTitle}“</h1>
          </div>
        </StTitle>
        <StDescription>
          <p>이 투표는 마감되었습니다!</p>
        </StDescription>
        <StButtonWrapper>
          <button type="button" onClick={handleGoToLanding}>
            Pic.me! 에서 내 투표 만들기
          </button>
        </StButtonWrapper>
      </StModal>
    </StModalWrapper>
  );
};

export default FinishedLanding;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100%;
  height: 100%;
  padding-left: 4.2rem;
  padding-right: 4.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);
`;

const StModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 28.8rem;
  padding: 4.9rem 1.8rem 0rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

  & > svg {
    width: 20rem;
    height: 6.6rem;
  }
`;

const StTitle = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 7.651rem;

  background: url(${Ballon});
  background-position: center;
  background-repeat: no-repeat;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}; // Caption2로 바꿔야함!!

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 21.2rem;
    height: 5.386rem;
    padding: 1rem 3.7rem;
  }
  & > svg {
    width: 21.2rem;
    height: 7.651rem;
  }
`;

const StDescription = styled.p`
  margin-top: 2.5rem;
  margin-bottom: 3.4rem;
  & > p {
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20}
  }
`;
const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  & > button {
    width: 100%;
    height: 5.4rem;

    border: none;
    border-radius: 0.9rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
  }
`;
