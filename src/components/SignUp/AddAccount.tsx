import React from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { SignUpInfo } from '../../types/auth';

const AddAccount = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInfo>({ mode: 'onSubmit' });

  const onValid = (data: SignUpInfo) => {
    console.log(data);
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: '비밀번호가 다릅니다' });
    }
  };

  console.log(errors);

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
          <StTitle>비밀번호</StTitle>
          <StInput
            {...register('password', {
              required: '비밀번호를 입력하지 않았습니다',
              minLength: {
                value: 10,
                message: '최소 글자수는 10자입니다.',
              },
              maxLength: {
                value: 16,
                message: '최대 글자수는 16자입니다.',
              },
              pattern: {
                value: /^[A-za-z0-9]{0,16}$/,
                message: '가능한 문자: 영문 대소문자, 숫자',
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <StInputDesc>영어/숫자 최대 16자</StInputDesc>
          <StInput
            {...register('passwordConfirm', {
              required: '비밀번호 확인이 필요합니다',
              minLength: { value: 3, message: '3글자 이상 입력해주세요.' },
            })}
            placeholder="확인을 위해 비밀번호를 입력해주세요"
          />
          <StSubmitBtn>다음 단계로 이동</StSubmitBtn>
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

const StInput = styled.input`
  width: 38.8rem;
  height: 2.9rem;
  margin-top: 2.7rem;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};

  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  border-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  outline: none;
`;

const StInputDesc = styled.p`
  margin-top: 0.7rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
`;

const StSubmitBtn = styled.button`
  width: 39rem;
  height: 5.8rem;

  margin-top: 15.3rem;
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  border-radius: 0.9rem;
  border: none;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  cursor: pointer;
`;

export default AddAccount;
