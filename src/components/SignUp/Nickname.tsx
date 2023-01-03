import React from 'react';
import styled, { css } from 'styled-components';

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
          <StAllCheckContainer></StAllCheckContainer>
        </StTermContainer>
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
  width: 29.3rem;
  height: 3rem;
  margin-top: 2.7rem;
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
  height: 3rem;
  margin-left: 1.6rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  border-radius: 2.2rem;
  border: none;
`;

const StTermContainer = styled.article`
  margin-top: 21.9rem;

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

export default Nickname;
