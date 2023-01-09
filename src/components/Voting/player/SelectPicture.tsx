import React from 'react';
import styled from 'styled-components';

import { IcCheckedRound } from '../../../asset/icon';

interface SelectPictureProps {
  src: string;
  alt: string;
}
const SelectPicture = (props: SelectPictureProps) => {
  const { src, alt } = props;
  return (
    <StSelectPictureWrapper>
      <img src={src} alt={alt} />
      <IcCheckedRound />
    </StSelectPictureWrapper>
  );
};

export default SelectPicture;

const StSelectPictureWrapper = styled.article`
  position: relative;

  width: 33.5rem;
  height: 44.7rem;
  margin-top: 1.7rem;

  & > img {
    width: 33.5rem;
    height: 44.7rem;

    border-radius: 1rem;
    object-fit: cover;
  }
  svg {
    position: absolute;
    left: 15rem;
    bottom: -1.6rem;
  }
`;
