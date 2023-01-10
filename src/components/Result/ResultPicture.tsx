import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcReasonBtnBefore } from '../../asset/icon';
import { HeaderLayout } from '../Layout';

interface ReasonPicProps {
  src: string;
}
const ResultPicture = (props: ReasonPicProps) => {
  const { src } = props;

  return (
    <>
      <StPictureWrapper>
        <StPicture src={src}></StPicture>
        <IcReasonBtnBefore />
      </StPictureWrapper>
    </>
  );
};

const StPictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  margin-top: 2.3rem;

  > svg {
    position: absolute;
    bottom: -3rem;
  }
`;

const StPicture = styled.img<{ src: string }>`
  width: 36.6rem;
  height: 48.836rem;
`;

export default ResultPicture;
