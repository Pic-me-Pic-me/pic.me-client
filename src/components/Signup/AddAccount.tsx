import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const AddAccount = () => {
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [warningMsg, setWarningMsg] = useState({
    emailWarningMsg: '',
    pwdWarningMsg: '',
    pwdConfirmWarningMsg: '',
  });

  const [isValid, setIsValid] = useState({
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordConfirmValid: false,
  });

  const handleValidation = (inputValueType: string, inputValue: string) => {
    switch (inputValueType) {
      case 'email':
        if (!EMAIL_REGEX.test(inputValue)) {
          setIsValid({ ...isValid, isEmailValid: false });
          setWarningMsg({ ...warningMsg, emailWarningMsg: '올바른 이메일 형식이 아닙니다!' });
        } else {
          setIsValid({ ...isValid, isEmailValid: true });
          setWarningMsg({ ...warningMsg, emailWarningMsg: '' });
        }
        setForm((prev) => ({ ...prev, email: inputValue }));
        break;

      case 'password':
        if (!PASSWORD_REGEX.test(inputValue)) {
          setIsValid({ ...isValid, isPasswordValid: false });
          setWarningMsg({ ...warningMsg, pwdWarningMsg: '영어/숫자를 포함하여 10-16자로 입력해주세요!' });
        } else {
          setIsValid({ ...isValid, isPasswordValid: true });
          setWarningMsg({ ...warningMsg, pwdWarningMsg: '' });
        }
        setForm((prev) => ({ ...prev, password: inputValue }));
        break;

      case 'passwordConfirm':
        if (inputValue !== form.password) {
          setIsValid({ ...isValid, isPasswordConfirmValid: false });
          setWarningMsg({ ...warningMsg, pwdConfirmWarningMsg: '비밀번호가 틀립니다!' });
        } else {
          setIsValid({ ...isValid, isPasswordConfirmValid: true });
          setWarningMsg({ ...warningMsg, pwdConfirmWarningMsg: '' });
        }
        setForm((prev) => ({ ...prev, passwordConfirm: inputValue }));
        break;
    }
  };

  const handleSubmitAccount = () => {
    const finalEmail = form.email;
    const finalPassword = form.password;
    const signupDataInfo = { finalEmail, finalPassword };
    navigate(`/signup/nickname`, { state: { signupDataInfo } });
  };

  const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    console.log(currentInputValue);
    if (currentInputValue.includes(' ')) {
      e.target.value = currentInputValue.replace(' ', '');
    }
  };

  return (
    <StWhiteSection>
      <StWrapper>
        <StForm onSubmit={handleSubmitAccount}>
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
          <StInputDesc>{warningMsg.emailWarningMsg}</StInputDesc>

          <StTitle>비밀번호</StTitle>
          <StInput
            type="password"
            required
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => {
              handleSpace(e);
              handleValidation('password', e.target.value);
            }}
          />
          <StInputDesc>{warningMsg.pwdWarningMsg}</StInputDesc>

          <StTitle>비밀번호 재확인</StTitle>
          <StInput
            type="password"
            placeholder="확인을 위해 비밀번호를 입력해주세요"
            required
            onChange={(e) => {
              handleSpace(e);
              handleValidation('passwordConfirm', e.target.value);
            }}
          />
          <StInputDesc>{warningMsg.pwdConfirmWarningMsg}</StInputDesc>

          <StSubmitBtn disabled={JSON.stringify(Object.values(isValid)) !== '[true,true,true]'}>
            다음 단계로 이동
          </StSubmitBtn>
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
