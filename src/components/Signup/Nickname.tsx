import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IMPOSSIBLE_NICKNAME_MSG, NICKNAME_MAX_LENGTH, POSSIBLE_NICKNAME_MSG } from '../../constant/signup';
import { postKakaoSignUp } from '../../lib/api/auth';
import { getUsernameCheck, postSignupInfo } from '../../lib/api/signup';
import { getAccessToken, setUserSession } from '../../lib/token';
import { AddAccountInfo, NicknameInfo } from '../../types/signup';
import Terms from './Terms';

const Nickname = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<NicknameInfo>({
    typedNickname: '',
    state: 'default',
  });

  const [isChecked, setIsChecked] = useState<boolean[]>(Array(3).fill(false));

  const handleCheckNickname = async () => {
    const response = await getUsernameCheck(nickname.typedNickname);

    if (response.success) {
      setNickname({
        ...nickname,
        state: 'pass',
        finalNickname: nickname.typedNickname,
        passMsg: POSSIBLE_NICKNAME_MSG,
      });
    } else {
      setNickname({ ...nickname, state: 'error', errorMsg: IMPOSSIBLE_NICKNAME_MSG });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    let signUpData;
    if (nickname.state === 'pass') {
      if (getAccessToken('kakaoAccessToken')) {
        const uid: number = location.state.uid;
        signUpData = await postKakaoSignUp(uid, nickname.finalNickname);
      } else {
        const { email, password }: AddAccountInfo = location.state.signupDataInfo;
        signUpData = await postSignupInfo({ email, password }, nickname.finalNickname);
      }
    }
    if (signUpData) {
      setUserSession(signUpData.accessToken);
      navigate('/home');
    }
  };

  const handleNicknameCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target;
    const currentInputValue = e.target.value;

    if (currentInputValue.includes(' ')) {
      const position = currentInput.selectionStart && currentInput.selectionStart - 1;
      e.target.value = currentInputValue.replace(' ', '');
      currentInput.setSelectionRange(position, position);
    }
    if (currentInputValue.length > NICKNAME_MAX_LENGTH) {
      e.target.value = currentInputValue.slice(0, NICKNAME_MAX_LENGTH);
    }
    setNickname({ ...nickname, state: 'default', typedNickname: e.target.value });
  };

  return (
    <>
      <StWrapper>
        <StForm>
          <StTitle>닉네임을 입력해주세요!</StTitle>
          <StNicknameWrapper>
            <StInputWrapper>
              <StInput
                type="text"
                minLength={1}
                maxLength={8}
                placeholder="닉네임을 입력해주세요 (최대 8자)"
                onChange={(e) => {
                  handleNicknameCondition(e);
                }}></StInput>
            </StInputWrapper>
            <StCheckDuplicationBtn
              type="button"
              onClick={handleCheckNickname}
              disabled={nickname.typedNickname.length === 0}>
              중복 확인
            </StCheckDuplicationBtn>
          </StNicknameWrapper>
          <StInputDesc isNicknameAvailable={nickname.state === 'error'}>
            {nickname.state !== 'default' && (nickname.state === 'error' ? nickname.errorMsg : nickname.passMsg)}
          </StInputDesc>

          <Terms isChecked={isChecked} setIsChecked={(isChecked) => setIsChecked(isChecked)} />

          <StSubmitBtn
            disabled={nickname.state !== 'pass' || JSON.stringify(isChecked) !== JSON.stringify(Array(3).fill(true))}
            onClick={(e) => handleSignup(e)}>
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

  border: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 0.6rem;
  outline: none;
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
`;

const StInputDesc = styled.p<{ isNicknameAvailable: boolean }>`
  height: 1.7rem;
  margin-top: 0.6rem;
  margin-left: 1.1rem;

  ${({ theme }) => theme.fonts.Pic_Caption2_Pretendard_Semibold_14};

  ${({ isNicknameAvailable }) =>
    isNicknameAvailable
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
