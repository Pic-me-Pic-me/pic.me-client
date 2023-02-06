import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { IcAfterCheckbox, IcBeforeCheckbox } from '../../asset/icon';
import { postKakaoSignUp } from '../../lib/api/auth';
import { useGetUsernameCheck } from '../../lib/hooks/useGetUsernameCheck';
import Token from '../../lib/token';
import Error404 from '../../pages/Error404';
import { KakaoAddNicknameInfo, NicknameInfo } from '../../types/signup';

const KakaoNickname = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { uid, email }: KakaoAddNicknameInfo = location.state;
  const [isChecked, setIsChecked] = useState<boolean[]>([false, false, false]);
  const [isNicknameExists, setIsNicknameExists] = useState<boolean>();
  const [isDuplicate, setIsDuplicate] = useState<boolean>();
  const [nickname, setNickname] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>();
  const termAddress = [
    'https://trusted-fir-e0c.notion.site/8040a51be7c74c7babf71d4ae344e162',
    'https://trusted-fir-e0c.notion.site/9df42e8f5c7246adb74027814a5c0cc9',
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<NicknameInfo>({ mode: 'onChange' });

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

  const handleCheck = (e: React.MouseEvent<HTMLElement>, idx?: number) => {
    const target = e.target as HTMLInputElement;
    if (target.name === 'all') {
      isChecked[0] ? setIsChecked([false, false, false]) : setIsChecked([true, true, true]);
    } else {
      if (idx) {
        isChecked[idx] = !isChecked[idx];
        isChecked[0] = isChecked[1] && isChecked[2] ? true : false;

        setIsChecked([...isChecked]);
      }
    }
  };

  const handleSignup = async () => {
    const signUpData = await postKakaoSignUp(uid, nickname, email);
    Token.setUserSession(signUpData.accessToken, signUpData.refreshToken);
    navigate('/home');
    window.location.reload();
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
                placeholder="닉네임을 입력해주세요 (최대 8자)"></StInput>
            </StInputWrapper>
            <StCheckDuplicationBtn
              type="button"
              onClick={handleCheckNickname}
              disabled={isNicknameExists ? false : true}>
              중복 확인
            </StCheckDuplicationBtn>
          </StNicknameWrapper>
          <StInputDesc isDuplicate>{errorMsg}</StInputDesc>

          <StTermWrapper>
            <StAllCheckWrapper>
              <StCheckboxBtn type="button" name="all" onClick={handleCheck}>
                {isChecked[0] ? <IcAfterCheckbox /> : <IcBeforeCheckbox />}
              </StCheckboxBtn>

              <StTermContent>
                <p>전체 동의</p>
              </StTermContent>
            </StAllCheckWrapper>
            <StDetailTermWrapper>
              <StDetailTerm>
                <StCheckboxBtn type="button" name="first" onClick={(e) => handleCheck(e, 1)}>
                  {isChecked[1] ? <IcAfterCheckbox /> : <IcBeforeCheckbox />}
                </StCheckboxBtn>
                <StTermContent>
                  <span>(필수) </span>
                  <span> 만 14세 이상이에요 </span>
                </StTermContent>
              </StDetailTerm>

              <StDetailTerm>
                <StCheckboxBtn type="button" name="first" onClick={(e) => handleCheck(e, 2)}>
                  {isChecked[2] ? <IcAfterCheckbox /> : <IcBeforeCheckbox />}
                </StCheckboxBtn>
                <StTermContent>
                  <span>(필수) </span>
                  <span>
                    <p onClick={() => window.open(termAddress[0], '_blank')}>
                      <u>이용약관</u>
                    </p>
                    및
                    <p onClick={() => window.open(termAddress[1], '_blank')}>
                      <u>개인정보수집이용</u>
                    </p>
                    동의
                  </span>
                </StTermContent>
              </StDetailTerm>
            </StDetailTermWrapper>
          </StTermWrapper>

          <StSubmitBtn
            disabled={
              isDuplicate || errors.username || JSON.stringify(isChecked) !== JSON.stringify([true, true, true])
                ? true
                : false
            }>
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
