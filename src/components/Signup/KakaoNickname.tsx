import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IMPOSSIBLE_NICKNAME_MSG, POSSIBLE_NICKNAME_MSG } from '../../constant/signup';
import { postKakaoSignUp } from '../../lib/api/auth';
import { getUsernameCheck } from '../../lib/api/signup';
import { KakaoAddNicknameInfo, NicknameInfo } from '../../types/signup';
import Terms from './Terms';

const NICKNAME_MAX_LENGTH = 8;

const KakaoNickname = () => {
  const location = useLocation();

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<NicknameInfo>({
    typedNickname: '',
    state: 'default',
  });

  const { uid, socialType, email }: KakaoAddNicknameInfo = location.state;
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

  const handleSignup = async () => {
    if (nickname.state === 'pass') {
      const signUpData = await postKakaoSignUp(uid, socialType, nickname.finalNickname, email);
      localStorage.setItem('accessToken', signUpData.accessToken);
      cookies.set('refreshToken', signUpData.refreshToken, { httpOnly: true });
      navigate('/login');
      window.location.reload();
    }
  };

  const handleNicknameCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    if (currentInputValue.includes(' ')) {
      e.target.value = currentInputValue.replace(' ', '');
    }
    if (currentInputValue.length > NICKNAME_MAX_LENGTH) {
      e.target.value = currentInputValue.slice(0, NICKNAME_MAX_LENGTH);
    }
    setNickname({ ...nickname, typedNickname: e.target.value });
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
            <StCheckDuplicationBtn type="button" onClick={handleCheckNickname} disabled={false}>
              중복 확인
            </StCheckDuplicationBtn>
          </StNicknameWrapper>
          <StInputDesc isDuplicate={nickname.state === 'error'}>
            {nickname.state !== 'default' && (nickname.state === 'error' ? nickname.errorMsg : nickname.passMsg)}
          </StInputDesc>

          <Terms isChecked={isChecked} setIsChecked={(isChecked) => setIsChecked(isChecked)} />

          <StSubmitBtn
            disabled={nickname.state !== 'pass' || isChecked !== Array(3).fill(true) ? true : false}
            onClick={handleSignup}>
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

  width: 100%;
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

const StCheckDuplicationBtn = styled.button`
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

const StTermWrapper = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 18.2rem;
`;

const StAllCheckWrapper = styled.section`
  display: flex;

  width: 92.38%;
  height: 3.2rem;

  border-left-width: 0rem;
  border-right-width: 0rem;
  border-top-width: 0rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.Pic_Color_Gray_4};
`;

const StCheckboxBtn = styled.button`
  height: 2.2rem;
  padding: 0;
  margin: 0;

  border: none;
  background-color: transparent;

  svg {
    pointer-events: none;
  }
`;

const StTermContent = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 2.2rem;
  margin-left: 2.14%;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  p {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  }

  span {
    display: flex;

    gap: 0.5rem;
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }

  span > p {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }

  span > p > u {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }

  span:first-child {
    margin-right: 0.71rem;
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;

const StDetailTermWrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 1.6rem;

  gap: 1.3rem;
`;

const StDetailTerm = styled.div`
  display: flex;
  align-items: center;
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
export default KakaoNickname;
