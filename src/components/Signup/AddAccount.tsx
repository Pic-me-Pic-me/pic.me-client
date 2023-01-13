import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SignUpInfo } from '../../types/signup';

const AddAccount = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignUpInfo>({ mode: 'onChange' });

  const handleSubmitAccount = () => {
    const { email, password } = getValues();
    const signupDataInfo = { email, password };
    navigate(`/signup/nickname`, { state: { signupDataInfo } });
  };

  return (
    <StWhiteSection>
      <StWrapper>
        <StForm onSubmit={handleSubmit(handleSubmitAccount)}>
          <StTitle>아이디</StTitle>
          <StInput
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: '올바른 이메일 형식이 아닙니다!',
              },
            })}
            placeholder="아이디로 이용할 이메일을 적어주세요!"
          />
          <StInputDesc>{errors.email ? errors.email.message : ' '}</StInputDesc>

          <StTitle>비밀번호</StTitle>
          <StInput
            type="password"
            {...register('password', {
              required: true,
              pattern: {
                value: /^[A-za-z0-9]{10,16}$/,
                message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <StInputDesc>{errors.password ? errors.password.message : ' '}</StInputDesc>

          <StTitle>비밀번호 재확인</StTitle>
          <StInput
            type="password"
            {...register('passwordConfirm', {
              required: true,
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

          <StSubmitBtn disabled={!isValid}>다음 단계로 이동</StSubmitBtn>
        </StForm>
      </StWrapper>
    </StWhiteSection>
  );
};

const StWhiteSection = styled.section`
  width: 100%;
  padding: 4.2rem 2rem 0rem 2rem;
  border-radius: 1.4rem 1.4rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_White};
`;
const StWrapper = styled.article`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StTitle = styled.h2`
  margin-top: 2rem;

  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;

const StInput = styled.input`
  width: 100%;
  height: 6rem;
  margin-top: 1.4rem;
  padding-left: 1.9rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};

  &:focus {
    border: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Coral};
  }
`;

const StInputDesc = styled.p`
  height: 1.7rem;
  margin-top: 0.6rem;

  ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
  color: ${({ theme }) => theme.colors.Pic_Color_Coral};
`;

const StSubmitBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 6rem;
  margin-top: 7.8rem;

  border-radius: 0.9rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  cursor: pointer;

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
        `}
`;

export default AddAccount;
