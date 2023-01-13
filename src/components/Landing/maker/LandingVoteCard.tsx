import styled from 'styled-components';

import { loading } from '../../common/style/animation';

const LandingVoteCard = () => <LandingVoteCardWrapper />;

export default LandingVoteCard;

const LandingVoteCardWrapper = styled.section`
  width: 25.7rem;
  height: 15.4rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  animation: ${loading} 2s infinite linear;
`;
