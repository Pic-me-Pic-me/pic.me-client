import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcModalBG } from '../../asset/icon';
import { Ballon } from '../../asset/image';
import { VoteProps } from '../../types/vote';

const VoteLanding = ({ vote }: VoteProps) => {
  const { voteTitle, userName } = vote;
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
        <StContent>
          <IcModalBG />
          <StDescription>
            <p>{userName}님의 사진</p>
            <p>2개 중 1개를 골라주세요!</p>
          </StDescription>
        </StContent>
        <StButtonWrapper>
          <button type="button">익명 투표 시작하기</button>
          <button type="button" onClick={handleGoToLanding}>
            홈으로 가기
          </button>
        </StButtonWrapper>
      </StModal>
    </StModalWrapper>
  );
};
export default VoteLanding;

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
  padding: 0rem 4.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);
`;

const StModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 54.8rem;
  padding: 4.9rem 1.8rem 0rem 1.8rem;
  margin: auto;

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

const StContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 1.95rem;

  & > svg {
    margin: 0 auto;
    width: 14.9rem;
    height: 15.8rem;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  width: 100%;

  & > button {
    width: 100%;
    height: 5.4rem;

    border: none;
    border-radius: 0.9rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
    color: ${({ theme }) => theme.colors.Pic_Color_White};
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

    cursor: pointer;

    :last-child {
      background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    }
  }
`;
