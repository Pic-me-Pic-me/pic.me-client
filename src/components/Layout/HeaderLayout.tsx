import { ReactNode } from 'react';
import styled from 'styled-components';

import { IcGoback } from '../../asset/icon';
import { ImgSignUpBanner } from '../../asset/image';

interface LayoutProps {
  HeaderTitle: ReactNode;
  isBanner?: boolean;
}

const HeaderLayout = (props: LayoutProps) => {
  const { HeaderTitle, isBanner } = props;

  return (
    <>
      <StHeader isBanner={isBanner}>
        <IcGoback />
        <StTitleWrapper isBanner={isBanner}>
          <h1>{HeaderTitle}</h1>
        </StTitleWrapper>
      </StHeader>
      {isBanner && (
        <SignUpBannerWrapper>
          <ImgSignUpBanner />
        </SignUpBannerWrapper>
      )}
    </>
  );
};

export default HeaderLayout;

const StHeader = styled.header<{ isBanner?: boolean }>`
  display: flex;
  align-items: center;

  height: 6.2rem;
  padding: 0 2.8rem 0 2rem;

  background-color: ${({ theme, isBanner }) => !isBanner && theme.colors.Pic_Color_White};

  & > svg > path {
    display: flex;
    align-items: center;

    stroke: ${({ theme, isBanner }) => (isBanner ? theme.colors.Pic_Color_Gray_6 : theme.colors.Pic_Color_Gray_2)};

    cursor: pointer;
  }
`;

const StTitleWrapper = styled.div<{ isBanner?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20};
    color: ${({ theme, isBanner }) => (isBanner ? theme.colors.Pic_Color_Gray_6 : theme.colors.Pic_Color_Gray_2)};
  }
`;

const SignUpBannerWrapper = styled.div`
  position: absolute;
  top: 0rem;
  z-index: -1;
`;
