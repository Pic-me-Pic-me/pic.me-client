import styled from 'styled-components';

import { loading } from '../../common/style/animation';

const LandingLibraryCard = () => (
  <StLandingLibraryCardWrapper>
    <StLandingDate />
    <StLandingCardItemBlock>
      <StLandingCardItem />
      <StLandingCardItem />
      <StLandingCardItem />
    </StLandingCardItemBlock>
  </StLandingLibraryCardWrapper>
);

export default LandingLibraryCard;

const StLandingLibraryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StLandingDate = styled.div`
  width: 9.1rem;
  height: 3rem;
  margin-bottom: 1.3rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  animation: ${loading} 2s infinite linear;
`;
const StLandingCardItemBlock = styled.div`
  display: flex;
  width: 100%;
`;
const StLandingCardItem = styled.div`
  width: 17.686rem;
  height: 23.394rem;
  & + & {
    margin-left: 1.521rem;
  }
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  animation: ${loading} 2s infinite linear;
`;
