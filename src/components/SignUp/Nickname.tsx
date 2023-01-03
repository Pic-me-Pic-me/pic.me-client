import React from 'react';
import styled, { css } from 'styled-components';

import { AfterCheckbox, BeforeCheckbox } from '../../asset/icon';

const Nickname = () => (
  <>
    <StContainer>
      <StForm>
        <StTitle>닉네임을 입력해주세요!</StTitle>

        <StInputContainer>
          <StInput placeholder="닉네임을 입력해주세요 (최대 8자)"></StInput>
          <StCheckDuplicationBtn>중복 확인</StCheckDuplicationBtn>
        </StInputContainer>

        <StTermContainer>
          <StAllCheckContainer>
            <BeforeCheckbox />
            <StTermContent>전체 동의</StTermContent>
          </StAllCheckContainer>
        </StTermContainer>

        <StSubmitBtn>계정 만들기</StSubmitBtn>
      </StForm>
    </StContainer>
  </>
);

const StContainer = styled.article`
  display: flex;
  justify-content: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.h2`
  margin-top: 5.3rem;

  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;

const StInputContainer = styled.div`
  display: flex;
  justify-content: ;
`;

const StInput = styled.input`
  width: 30rem;
  height: 6rem;
  margin-top: 1.4rem;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};

  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  border-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  outline: none;
`;

const StCheckDuplicationBtn = styled.button`
  align-self: flex-end;

  width: 8rem;
  height: 6rem;
  margin-left: 1rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  border-radius: 0.6rem;
  border: none;
`;

const StTermContainer = styled.article`
  margin-top: 18.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StAllCheckContainer = styled.section`
  display: flex;

  width: 38.8rem;
  height: 3.2rem;

  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  border-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
`;

const StTermContent = styled.p`
  ${({ theme }) => theme.fonts.Pic_body1_Pretendard_Medium_16};
`;

const StSubmitBtn = styled.button`
  width: 39rem;
  height: 5.8rem;

  margin-top: 7.2rem;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  border-radius: 0.9rem;
  border: none;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  cursor: pointer;

  &.activated {
    transform: translateX(0);
  }
`;
export default Nickname;
