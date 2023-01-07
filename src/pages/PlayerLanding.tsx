import React, { useState } from 'react';
import styled from 'styled-components';

import { FinishedLanding, VoteLanding } from '../components/Landing';

const PlayerLanding = () => {
  const [isFinished, setIsFinished] = useState(true);
  return (
    <>
      isFinished ? <VoteLanding /> : <FinishedLanding />
    </>
  );
};

export default PlayerLanding;
