import { ReactNode } from 'react';
import styled from 'styled-components';

import { IcGoback } from '../../asset/icon';

interface LayoutProps {
  HeaderTitle: ReactNode;
  isBanner?: boolean;
  handleGoback: React.MouseEventHandler;
}

const HeaderLayout = (props: LayoutProps) => {
  const { HeaderTitle, isBanner, handleGoback } = props;

  return (
    <StHeader isBanner={isBanner}>
      <IcGoback onClick={handleGoback} />
      <StTitle isBanner={isBanner}>
        <h1>{HeaderTitle}</h1>
      </StTitle>
    </StHeader>
  );
};

export default HeaderLayout;

const StHeader = styled.header<{ isBanner?: boolean }>`
  display: flex;
  align-items: center;

  position: sticky;

  top: 0rem;
  height: 8rem;
  padding-right: 3.8rem;

  width: 100%;

  background: none;

  background-color: ${({ theme, isBanner }) => !isBanner && theme.colors.Pic_Color_White};

  z-index: 100;

  & > svg {
    width: 4.9rem;

    cursor: pointer;
    & > path {
      display: flex;
      align-items: center;

      stroke: ${({ theme, isBanner }) => (isBanner ? theme.colors.Pic_Color_Gray_6 : theme.colors.Pic_Color_Gray_3)};
    }
  }
`;

const StTitle = styled.div<{ isBanner?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
    color: ${({ theme, isBanner }) => (isBanner ? theme.colors.Pic_Color_Gray_6 : theme.colors.Pic_Color_Gray_3)};
  }
`;
