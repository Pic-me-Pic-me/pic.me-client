import { ReactNode } from 'react';
import styled from 'styled-components';

import { IcGoback, IcHeaderLogo } from '../../../asset/icon';

interface LayoutProps {
  handleGoback: React.MouseEventHandler;
  IcHeaderSequence: ReactNode;
}

const HeaderLayout = (props: LayoutProps) => {
  const { handleGoback, IcHeaderSequence } = props;

  return (
    <>
      <StHeader>
        <IcGoback className="back_icon" onClick={handleGoback} />
        <IcHeaderLogo />
        {IcHeaderSequence}
      </StHeader>
    </>
  );
};

export default HeaderLayout;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 56em;
  margin-top: 2.4rem;
  background: none;

  background-color: ${({ theme }) => theme.colors.Pic_Color_White};

  & > svg {
    position: absolute;
    cursor: pointer;

    :first-child {
      left: 2rem;
    }

    :last-child {
      right: 2rem;
    }
    & > path {
      display: flex;
      align-items: center;
    }
  }
`;
