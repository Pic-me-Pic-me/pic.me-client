import styled from 'styled-components';

import { IcSkeletonBack, IcSkeletonHeader, IcSkeletonMenu } from '../../../asset/icon';
import { loading } from '../../common/style/animation';

interface LayoutProps {
  isSideIcon?: boolean;
}

const LandingHeader = (props: LayoutProps) => {
  const { isSideIcon } = props;

  return (
    <StHeaderLayoutWrapper>
      {!isSideIcon && <IcSkeletonBack />}
      <div className="picme_logo"></div>
      {!isSideIcon && <IcSkeletonHeader />}
    </StHeaderLayoutWrapper>
  );
};

export default LandingHeader;

const StHeaderLayoutWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 1.3rem;

  .picme_logo {
    width: 8.5rem;
    height: 2.6rem;

    background: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 0.3rem;

    animation: ${loading} 2s infinite linear;
  }
  & > svg {
    position: absolute;

    :first-child {
      left: 2rem;
    }

    :last-child {
      right: 2rem;
    }
  }
`;
