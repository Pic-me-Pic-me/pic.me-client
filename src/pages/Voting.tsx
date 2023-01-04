import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Error, Loading } from '../components/common';
import { Header } from '../components/Voting';
import { DragReason } from '../components/Voting/player';
import { useGetVotingInfo } from '../lib/hooks/voting';
import { votingStateSelector } from '../recoil/player/selector';

const Voting = () => (
  <div>
    <DragReason />
  </div>
);
export default Voting;
