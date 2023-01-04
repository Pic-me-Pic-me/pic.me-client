import { watch } from 'fs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { NicknameInfo, SignUpInfo } from '../../types/auth';

const AddAccount = () => {
  const [isActivated, setIsActivated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpInfo>({ mode: 'onBlur' });

  const onValid = (data: SignUpInfo) => {
    console.log(data);
  };
  return (
    <>
      <StContainer>
        <StForm onSubmit={handleSubmit(onValid)}>
          <StTitle>아이디</StTitle>
          <StInput
            type="text"
            {...register('user_id', {
              required: '아이디를 입력하지 않았습니다',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: '이메일 형식이 맞지 않습니다',
              },
            })}
            placeholder="아이디로 이용할 이메일을 적어주세요!"
          />
          <StInputDesc>{errors.user_id ? errors.user_id.message : ' '}</StInputDesc>

          <StTitle>비밀번호</StTitle>
          <StInput
            {...register('password', {
              required: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
              minLength: {
                value: 10,
                message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
              },
              maxLength: {
                value: 16,
                message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
              },
              pattern: {
                value: /^[A-za-z0-9]{0,16}$/,
                message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <StInputDesc>{errors.password ? errors.password.message : ' '}</StInputDesc>

          <StTitle>비밀번호 재확인</StTitle>
          <StInput
            {...register('passwordConfirm', {
              required: '비밀번호 확인이 필요합니다',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || '비밀번호가 틀립니다!';
                },
              },
            })}
            placeholder="확인을 위해 비밀번호를 입력해주세요"
          />
          <StInputDesc>{errors.passwordConfirm ? errors.passwordConfirm.message : ' '}</StInputDesc>

          <StSubmitBtn className={isActivated ? 'activated' : ''} disabled={isActivated ? false : true}>
            다음 단계로 이동
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

  margin-top: 4.8rem;
`;

const StTitle = styled.h2`
  margin-top: 2rem;

  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;

const StInput = styled.input`
  width: 39rem;
  height: 6rem;
  margin-top: 1.4rem;
  padding-left: 1.9rem;

  border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;

const StInputDesc = styled.p`
  height: 1.7rem;
  margin-top: 0.6rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
`;

const StSubmitBtn = styled.button`
  width: 39rem;
  height: 6rem;
  margin-top: 7.8rem;

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

export default AddAccount;
