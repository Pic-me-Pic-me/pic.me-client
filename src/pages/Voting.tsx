import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Error, Loading } from '../components/common';
import { Header } from '../components/Voting';
import { ReasonSlider } from '../components/Voting/player';
import { useGetVotingInfo } from '../lib/hooks/useGetVotingInfo';
import { votingStateSelector } from '../recoil/player/selector';

const Voting = () => (
  <StDragReasonWrapper>
    <ReasonSlider />
  </StDragReasonWrapper>
);
export default Voting;

const StDragReasonWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
`;
