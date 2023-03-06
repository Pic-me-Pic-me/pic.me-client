import React from 'react';
import styled from 'styled-components';

const FOOTER_LINK_ADDRESS = [
  'https://trusted-fir-e0c.notion.site/8040a51be7c74c7babf71d4ae344e162',
  'https://trusted-fir-e0c.notion.site/9df42e8f5c7246adb74027814a5c0cc9',
  'https://www.notion.so/Team-Pic-me-e24dfca43b6b4ed296556f835e7662eb',
];

const Footer = () => (
  <StFooterWrapper>
    <StLeftSection>
      <p onClick={() => window.open(FOOTER_LINK_ADDRESS[0])}>이용약관</p>
      <p onClick={() => window.open(FOOTER_LINK_ADDRESS[1])}>개인정보수집이용</p>
    </StLeftSection>
    <StRightSection>
      <span>Contact</span>
      <p>with.picme@gmail.com</p>
      <span>Team</span>
      <p onClick={() => window.open(FOOTER_LINK_ADDRESS[2])}>공식 노션 바로가기</p>
      <span>Instagram</span>
      <p>@official_pic.me</p>
    </StRightSection>
  </StFooterWrapper>
);

export default Footer;

const StFooterWrapper = styled.footer`
  display: flex;

  width: 100%;
  height: 21.3rem;
  padding: 3.5rem 3.1rem;

  color: #5c5c5c;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
`;

const StLeftSection = styled.section`
  flex: 1;

  > p {
    padding-bottom: 3rem;

    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;

const StRightSection = styled.section`
  flex: 1;

  > span {
    ${({ theme }) => theme.fonts.Pic_Body2_Pretendard_Bold_16};
  }

  > p {
    padding-bottom: 1.3rem;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.7rem;
  }
`;
