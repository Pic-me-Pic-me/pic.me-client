import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { postSignupInfo } from '../../lib/api/signup';
import { useGetUsernameCheck } from '../../lib/hooks/useGetUsernameCheck';
import Error404 from '../../pages/Error404';
import { AddAccountInfo, NicknameInfo } from '../../types/signup';
import Terms from './Terms';

const Nickname = () => {
  const location = useLocation();
  const { email, password }: AddAccountInfo = location.state.signupDataInfo;

  const cookies = new Cookies();

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean[]>(Array(3).fill(false));
  const [isDuplicate, setIsDuplicate] = useState<boolean>();
  const [isNicknameExists, setIsNicknameExists] = useState<boolean>();
  const [nickname, setNickname] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<NicknameInfo>({ mode: 'onBlur' });

  useEffect(() => {
    const currentNickname = watch('username');
    currentNickname.length > 0 ? setIsNicknameExists(true) : setIsNicknameExists(false);
  }, [watch('username')]);

  const { username } = getValues();
  const { isNicknamePossible, isError } = useGetUsernameCheck(username);

  const handleCheckNickname = () => {
    if (isNicknamePossible) {
      if (isNicknamePossible?.success) {
        setIsDuplicate(false);
        setErrorMsg('사용 가능한 닉네임입니다.');
        setNickname(username);
      } else {
        setErrorMsg('이미 사용 중인 닉네임입니다.');
        setIsDuplicate(true);
      }
    }
  };

  const handleSignup = () => {
    postSignupInfo({ email, password }, nickname).then((res) => {
      if (res?.success) {
        cookies.set('refreshToken', res.data.refreshToken);
        localStorage.setItem('accessToken', res.data.accessToken);
        navigate('/home');
      }
    });
  };

  const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    console.log(currentInputValue);
    if (currentInputValue.includes(' ')) {
      e.target.value = currentInputValue.replace(' ', '');
    }
  };

  if (isError) {
    return <Error404 />;
  }

  return (
    <>
      <StWrapper>
        <StForm onSubmit={handleSubmit(handleSignup)}>
          <StTitle>닉네임을 입력해주세요!</StTitle>
          <StNicknameWrapper>
            <StInputWrapper>
              <StInput
                type="text"
                {...register('username', {
                  required: true,
                })}
                maxLength={8}
                placeholder="닉네임을 입력해주세요 (최대 8자)"
                onChange={(e) => handleSpace(e)}></StInput>
            </StInputWrapper>
            <StCheckDuplicationBtn
              type="button"
              onClick={handleCheckNickname}
              disabled={isNicknameExists ? false : true}>
              중복 확인
            </StCheckDuplicationBtn>
          </StNicknameWrapper>
          <StInputDesc isDuplicate>{errorMsg}</StInputDesc>

          <Terms isChecked={isChecked} setIsChecked={() => setIsChecked(isChecked)} />

          <StSubmitBtn disabled={isDuplicate || errors.username || isChecked !== Array(3).fill(true) ? true : false}>
            계정 만들기
          </StSubmitBtn>
        </StForm>
      </StWrapper>
    </>
  );
};

const StWrapper = styled.article`
  display: flex;
  justify-content: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 0% 5% 0% 5%;
`;

const StTitle = styled.h2`
  margin-top: 5.3rem;

  ${({ theme }) => theme.fonts.Pic_Title1_Pretendard_Bold_24}
`;

const StNicknameWrapper = styled.div`
  display: flex;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const StInput = styled.input`
  width: 100%;
  height: 6rem;
  margin-top: 1.4rem;
  padding-left: 7.14%;

  border: 1px solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
`;

const StInputDesc = styled.p<{ isDuplicate: boolean }>`
  margin-top: 0.6rem;

  ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};
  color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  ${({ isDuplicate }) =>
    isDuplicate
      ? css`
          color: ${({ theme }) => theme.colors.Pic_Color_Coral};
        `
      : css`
          color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
        `}
`;

const StCheckDuplicationBtn = styled.button<{ disabled: boolean }>`
  align-self: flex-end;

  width: 8rem;
  height: 6rem;
  margin-left: 1rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  border: none;
  color: ${({ theme }) => theme.colors.Pic_Color_White};

  cursor: pointer;

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
        `}
`;
const StSubmitBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 5.8rem;
  margin-top: 7.2rem;

  border-radius: 0.9rem;
  border: none;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  color: ${({ theme }) => theme.colors.Pic_Color_White};

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
export default Nickname;
