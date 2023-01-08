import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { VoteProps } from '../../types/vote';

const FinishedLanding = ({ vote }: VoteProps) => {
  const title = `\"${vote?.voteTitle}\"`;
  const navigate = useNavigate();

  return (
    <StModalWrapper>
      <StModal>
        <StTitle>
          <div>
            <h1>{title}</h1>
          </div>
        </StTitle>
        <StDescription>
          <p>이 투표는 마감되었습니다!</p>
        </StDescription>
        <button type="button" onClick={() => navigate('/makerlanding')}>
          Pic.me! 에서 내 투표 만들기
        </button>
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
  padding: 0rem 4.2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2rem);
`;

const StModal = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 54.8rem;
  padding: 4.9rem 1.8rem 2.3rem 1.8rem;
  margin: auto;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
  border-radius: 1rem;

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
  z-index: 1;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}; // Caption2로 바꿔야함!!

  & > div {
    display: flex;
    z-index: 100;

    width: 21.2rem;
    height: 5.386rem;
    padding: 0rem 3.7rem;

    & > h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }

  & > svg {
    position: absolute;
    width: 21.2rem;
    height: 7.651rem;
    object-fit: fill;
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
