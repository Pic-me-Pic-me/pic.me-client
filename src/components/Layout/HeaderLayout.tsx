import { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  GobackIcon: ReactNode;
  HeaderTitle: ReactNode;
  ShareIcon: ReactNode;
  isShare: boolean;
}

const HeaderLayout = (props: LayoutProps) => {
  const { GobackIcon, HeaderTitle, ShareIcon, isShare } = props;

  return (
    <StHeader>
      <StGobackIcon>{GobackIcon}</StGobackIcon>
      <h1>{HeaderTitle}</h1>
      {isShare ? <StShareIcon>{ShareIcon}</StShareIcon> : <div></div>}
    </StHeader>
  );
};

export default HeaderLayout;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 6.2rem;
  margin: 0 2rem 0 2rem;

  & > h1 {
    ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20}
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }

  & > div {
    width: 2.1rem;
    height: 2.2rem;
  }
`;
const StGobackIcon = styled.div`
  display: flex;
  align-items: center;

  width: 2rem;

  & > :first-child {
    cursor: pointer;
  }
`;

const StShareIcon = styled.div`
  display: flex;
  align-items: center;

  & > :first-child {
    cursor: pointer;
  }
`;
