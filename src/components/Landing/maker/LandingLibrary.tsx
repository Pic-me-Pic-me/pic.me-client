import styled from 'styled-components';

import LandingHeader from './LandingHeader';
import LandingLibraryList from './LandingLibraryList';

const LandingLibrary = () => (
  <StLandingLibraryWrapper>
    <LandingHeader />
    <LandingLibraryList />
    <LandingLibraryList />
    <LandingLibraryList />
  </StLandingLibraryWrapper>
);

export default LandingLibrary;

const StLandingLibraryWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 2rem;
`;
