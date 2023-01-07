import React, { useState } from 'react';
import styled from 'styled-components';

import { FinishedLanding, VoteLanding } from '../components/Landing';

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState(false);
  return (
    <>
      <VoteLanding />
    </>
  );
};

export default PlayerLanding;
