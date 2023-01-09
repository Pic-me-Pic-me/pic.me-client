import styled from 'styled-components';

import { IcGoback } from '../../../asset/icon';
import { loading } from '../../common/style/animation';

const LandingHeader = () => (
  <StLadingHeaderWrapper>
    <IcGoback />
    <StTitle>
      <h1 />
    </StTitle>
  </StLadingHeaderWrapper>
);
export default LandingHeader;
const StLadingHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8rem;
  padding-right: 5.4rem;
  & > svg {
    width: 5.4rem;
    & > path {
      display: flex;
      align-items: center;
      stroke: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
      animation: ${loading} 2s infinite linear;
    }
  }
`;
const StTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > h1 {
    width: 7.6rem;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 0.3rem;
    animation: ${loading} 2s infinite linear;
  }
`;
