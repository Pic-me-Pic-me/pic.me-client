import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { AfterCheckbox, BeforeCheckbox } from '../../asset/icon';
import { NicknameInfo } from '../../types/auth';

const Nickname = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NicknameInfo>({ mode: 'onSubmit' });

  const handleValid = (data: NicknameInfo) => {
    console.log(data);
  };

  return (
    <>
      <StContainer>
        <StForm onSubmit={handleSubmit(handleValid)}>
          <StTitle>닉네임을 입력해주세요!</StTitle>

          <StInputContainer>
            <StInput
              type="text"
              {...register('nickname', { required: '닉네임은 필수 입력 요소입니다!' })}
              placeholder="닉네임을 입력해주세요 (최대 8자)"></StInput>

            <StCheckDuplicationBtn type="button">중복 확인</StCheckDuplicationBtn>
          </StInputContainer>

          <StTermContainer>
            <StAllCheckContainer>
              <BeforeCheckbox />
              <StTermContent>
                <p>전체 동의</p>
              </StTermContent>
            </StAllCheckContainer>

            <StDetailTermContainer>
              <StDetailTerm>
                <BeforeCheckbox />
                <StTermContent>
                  <span>(필수) </span>
                  <span>만 14세 이상이에요 </span>
                </StTermContent>
              </StDetailTerm>

              <StDetailTerm>
                <BeforeCheckbox />
                <StTermContent>
                  <span>(필수) </span>
                  <span>이용약관 및 개인정보수집이용 동의</span>
                </StTermContent>
              </StDetailTerm>
            </StDetailTermContainer>
          </StTermContainer>

          <StSubmitBtn className={watch().nickname !== '' ? 'activated' : ''} disabled={errors.nickname ? true : false}>
            계정 만들기
          </StSubmitBtn>
        </StForm>
      </StContainer>
    </>
  );
};

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
  padding-left: 1.9rem;

  border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;

  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
`;

const StInputDesc = styled.p`
  margin-top: 0.6rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
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

  &.activated {
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }
`;

const StTermContainer = styled.article`
  display: flex;
  flex-direction: column;

  margin-top: 18.2rem;
`;

const StAllCheckContainer = styled.section`
  display: flex;

  width: 38.8rem;
  height: 3.2rem;

  border-left-width: 0rem;
  border-right-width: 0rem;
  border-top-width: 0rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
`;

const StTermContent = styled.div`
  display: flex;
  align-items: center;

  width: 30rem;
  height: 2.2rem;
  margin-left: 0.9rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};

  p {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  span {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }

  span:first-child {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  span:last-child {
    margin-left: 0.3rem;
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;

const StDetailTermContainer = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 1.6rem;

  gap: 1.3rem;
`;

const StDetailTerm = styled.div`
  display: flex;
  align-items: center;
`;

const StSubmitBtn = styled.button`
  width: 39rem;
  height: 5.8rem;
  margin-top: 7.2rem;

  border-radius: 0.9rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  cursor: pointer;

  &.activated {
    background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;
export default Nickname;
