import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import resultSample from '../asset/image/resultSample.png';
import { HeaderLayout } from '../Layout';

export const FirstResult = () => {
  const navigate = useNavigate();

  return (
    <>
      <StBackground src={resultSample}>
        <StTitle>내 친구들이 뽑은 No.1</StTitle>
      </StBackground>
    </>
  );
};

const StBackground = styled.article<{ src: string }>`
  background: ${(props) => `url(${props.src})`};
  background-size: cover;
`;

const StTitle = styled.h1``;
