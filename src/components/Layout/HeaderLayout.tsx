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
    <>
      <StHeader isBanner={isBanner}>
        <IcGoback onClick={handleGoback} />
        <StTitle isBanner={isBanner}>
          <h1>{HeaderTitle}</h1>
        </StTitle>
      </StHeader>
    </>
  );
};

export default HeaderLayout;

const StHeader = styled.header<{ isBanner?: boolean }>`
  display: flex;
  align-items: center;
  position: sticky;

  top: 0rem;
  height: 6.2rem;
  padding-right: 5.4rem;

  background: none;

  background-color: ${({ theme, isBanner }) => !isBanner && theme.colors.Pic_Color_White};

  & > svg {
    width: 5.4rem;

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
    ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20};
    color: ${({ theme, isBanner }) => (isBanner ? theme.colors.Pic_Color_Gray_6 : theme.colors.Pic_Color_Gray_3)};
  }
`;
