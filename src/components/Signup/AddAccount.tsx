import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import {
  EMAIL_ERROR_MSG,
  EMAIL_REGEX,
  initialSignupInfo,
  PASSWORD_CONFIRM_ERROR_MSG,
  PASSWORD_ERROR_MSG,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '../../constant/signup';
import { SignUpInfo } from '../../types/signup';
import { checkIsValid } from '../../utils/checkIsValidate';

const AddAccount = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<SignUpInfo>(initialSignupInfo);
  const isSubmitBtnDiabled =
    !signupInfo.emailInfo.isValid || !signupInfo.passwordInfo.isValid || !signupInfo.passwordConfirmInfo.isValid;

  const handleValidation = (inputValueType: string, inputValue: string) => {
    switch (inputValueType) {
      case 'email':
        checkIsValid(EMAIL_REGEX, inputValue)
          ? setSignupInfo({
              ...signupInfo,
              emailInfo: { email: inputValue, isValid: true, errorMsg: null },
            })
          : setSignupInfo({
              ...signupInfo,
              emailInfo: { email: null, isValid: false, errorMsg: EMAIL_ERROR_MSG },
            });
        break;

      case 'password':
        checkIsValid(PASSWORD_REGEX, inputValue)
          ? setSignupInfo({
              ...signupInfo,
              passwordInfo: { password: inputValue, isValid: true, errorMsg: null },
            })
          : setSignupInfo({
              ...signupInfo,
              passwordInfo: { password: null, isValid: false, errorMsg: PASSWORD_ERROR_MSG },
            });
        break;

      case 'passwordConfirm':
        inputValue === signupInfo.passwordInfo.password
          ? setSignupInfo({
              ...signupInfo,
              passwordConfirmInfo: { isValid: true, errorMsg: null },
            })
          : setSignupInfo({
              ...signupInfo,
              passwordConfirmInfo: { isValid: false, errorMsg: PASSWORD_CONFIRM_ERROR_MSG },
            });

        break;
    }
  };

  const handleSubmitAccount = (e: React.FormEvent) => {
    e.preventDefault();

    const finalEmail = signupInfo.emailInfo.email;
    const finalPassword = signupInfo.passwordInfo.password;
    const signupDataInfo = { email: finalEmail, password: finalPassword };
    navigate(`/signup/nickname`, { state: { signupDataInfo } });
  };

  const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target;
    const currentInputValue = e.target.value;

    if (currentInputValue.includes(' ')) {
      const position = currentInput.selectionStart && currentInput.selectionStart - 1;
      e.target.value = currentInputValue.replace(' ', '');
      currentInput.setSelectionRange(position, position);
    }
  };

  return (
    <StWhiteSection>
      <StWrapper>
        <StForm onSubmit={(e) => handleSubmitAccount(e)}>
          <StTitle>아이디</StTitle>
          <StInput
            type="text"
            required
            placeholder="아이디로 이용할 이메일을 적어주세요!"
            onBlur={(e) => {
              handleValidation('email', e.target.value);
            }}
            onChange={(e) => {
              handleSpace(e);
            }}
          />
          <StInputDesc>{signupInfo.emailInfo.errorMsg}</StInputDesc>

          <StTitle>비밀번호</StTitle>
          <StInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            minLength={8}
            maxLength={16}
            onChange={(e) => {
              handleSpace(e);
              handleValidation('password', e.target.value);
            }}
          />
          <StInputDesc>{signupInfo.passwordInfo.errorMsg}</StInputDesc>

          <StTitle>비밀번호 재확인</StTitle>
          <StInput
            type="password"
            placeholder="확인을 위해 비밀번호를 입력해주세요"
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={PASSWORD_MAX_LENGTH}
            onChange={(e) => {
              handleSpace(e);
              handleValidation('passwordConfirm', e.target.value);
            }}
          />
          <StInputDesc>{signupInfo.passwordConfirmInfo.errorMsg}</StInputDesc>

          <StSubmitBtn disabled={isSubmitBtnDiabled}>다음 단계로 이동</StSubmitBtn>
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
