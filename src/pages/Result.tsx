import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import resultSample from '../asset/image/resultSample.png';
import { HeaderLayout } from '../components/Layout';
import ResultReason from '../components/Result/ResultReason';

export const Result = () => {
  const navigate = useNavigate();

  return (
    <>
      <ResultReason></ResultReason>
    </>
  );
};
