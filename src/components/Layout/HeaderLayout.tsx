import { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  Logo: ReactNode;
  CategoryInfo: ReactNode;
  PersonalInfo: ReactNode;
  children?: ReactNode;
  isWhite: boolean;
}

const HeaderLayout = (props: LayoutProps) => {
  const { Logo, CategoryInfo, PersonalInfo, children, isWhite } = props;

  return (
    <StHeader isWhite={isWhite}>
      <StLeft>
        {Logo}
        {CategoryInfo}
      </StLeft>
      {children}
      <StRight>{PersonalInfo}</StRight>
    </StHeader>
  );
};

export default HeaderLayout;

const StHeader = styled.header<{ isWhite: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 120rem;
  height: 4.375rem;
  margin: 0 0 2.4375rem;

  background-color: ${({ isWhite, theme }) => (isWhite ? theme.colors.picme_black : theme.colors.picme_blue)};

  & > form {
    width: 68rem;
    height: 2.625rem;
  }
`;
const StLeft = styled.div`
  display: flex;
  align-items: center;

  margin-left: 1.9rem;
  padding: 0;

  gap: 2rem;

  & > :first-child {
    cursor: pointer;
  }
`;

const StRight = styled.div`
  display: flex;
  align-items: center;

  margin-right: 1.8813rem;
  padding: 0;

  gap: 2rem;

  & > :first-child {
    cursor: pointer;
  }
`;
