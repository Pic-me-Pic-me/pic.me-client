import styled from 'styled-components';

import LandingLibraryCard from './LandingLibraryCard';

const LandingLibraryList = () => (
  <StLandingLibraryCardWrapper>
    <StLandingLibraryLi>
      <LandingLibraryCard />
    </StLandingLibraryLi>
  </StLandingLibraryCardWrapper>
);

export default LandingLibraryList;

const StLandingLibraryCardWrapper = styled.main`
  display: flex;

  width: 100%;
  & + & {
    margin-top: 4.906rem;
  }

  overflow-x: hidden;
`;

const StLandingLibraryLi = styled.li`
  list-style: none;
`;
