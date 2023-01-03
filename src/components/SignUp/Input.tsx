import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  isPwdInput?: boolean;
  isSecondPwdInput?: boolean;
  isWrong?: boolean;
}

export default function Input(props: InputProps) {
  const { isPwdInput, isSecondPwdInput, isWrong } = props;

  return (
    <>
      <StInput
        isSecondPwdInput={isSecondPwdInput}
        placeholder={
          isPwdInput
            ? isSecondPwdInput
              ? '확인을 위해 비밀번호를 입력해주세요'
              : '비밀번호를 입력해주세요'
            : '아이디로 이용할 이메일을 적어주세요!'
        }
        type="password"></StInput>
      <StInputDesc isWrong={isWrong} isSecondPwdInput={isSecondPwdInput}>
        {' '}
      </StInputDesc>
    </>
  );
}

const StInput = styled.input<{ isSecondPwdInput?: boolean }>`
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

  ${(isSecondInput) =>
    isSecondInput &&
    css`
      margin-top: 1.7rem;
    `}
`;

const StInputDesc = styled.p<InputProps>`
  margin-top: 0.7rem;
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};

  ${(props) =>
    props.isWrong &&
    props.isSecondPwdInput &&
    css`
      margin-top: 0.9rem;
      ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
      color: ${({ theme }) => theme.colors.Pic_Color_Coral};
    `};
`;
