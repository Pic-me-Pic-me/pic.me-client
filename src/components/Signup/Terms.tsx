import React from 'react';
import styled, { css } from 'styled-components';

import { IcAfterCheckbox, IcBeforeCheckbox } from '../../asset/icon';

interface TermProps {
  isChecked: boolean[];
  setIsChecked: (isChecked: boolean[]) => void;
}

export default function Terms(props: TermProps) {
  const { isChecked, setIsChecked } = props;
  const termAddress = [
    'https://trusted-fir-e0c.notion.site/8040a51be7c74c7babf71d4ae344e162',
    'https://trusted-fir-e0c.notion.site/9df42e8f5c7246adb74027814a5c0cc9',
  ];

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
  return (
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
  );
}

const StTermWrapper = styled.article`
  display: flex;
  flex-direction: column;

  max-width: 100%;
  margin-top: 18.2rem;
`;

const StAllCheckWrapper = styled.section`
  display: flex;

  max-width: 100%;
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
