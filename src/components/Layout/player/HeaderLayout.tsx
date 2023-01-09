import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcGoback, IcHeaderLogo } from '../../../asset/icon';

interface LayoutProps {
  isSideIcon?: boolean;
  handleGoback?: React.MouseEventHandler;
  IcHeaderSequence?: ReactNode;
}

const HeaderLayout = (props: LayoutProps) => {
  const { isSideIcon, handleGoback, IcHeaderSequence } = props;

  const navigate = useNavigate();

  return (
    <StHeaderLayoutWrapper>
      {!isSideIcon && <IcGoback className="back_icon" onClick={handleGoback} />}
      <div>
        <IcHeaderLogo onClick={() => navigate('/')} />
      </div>

      {!isSideIcon && IcHeaderSequence}
    </StHeaderLayoutWrapper>
  );
};

export default HeaderLayout;

const StHeaderLayoutWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 1.3rem;

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
