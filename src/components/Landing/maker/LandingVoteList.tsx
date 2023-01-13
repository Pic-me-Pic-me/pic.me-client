import styled from 'styled-components';

import LandingVoteCard from './LandingVoteCard';

const LandingVoteList = () => (
  <StLandingVoteListWrapper>
    <StLandingLi>
      <LandingVoteCard />
    </StLandingLi>
    <StLandingLi>
      <LandingVoteCard />
    </StLandingLi>
  </StLandingVoteListWrapper>
);

export default LandingVoteList;

const StLandingVoteListWrapper = styled.main`
  display: flex;

  width: 100%;
  padding-left: 2rem;
  margin-top: 8.8rem;

  overflow-x: hidden;
`;

const StLandingLi = styled.li`
  & + & {
    margin-left: 1.6rem;
  }
  list-style: none;
`;
