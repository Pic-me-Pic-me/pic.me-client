import React from 'react';
import styled from 'styled-components';

import { IcCheckedRound } from '../../../asset/icon';

interface SelectPictureProps {
  src: string;
  alt: string;
  width: number;
}
const SelectPicture = (props: SelectPictureProps) => {
  const { src, alt, width } = props;
  return (
    <StSelectPictureWrapper width={width}>
      <img src={src} alt={alt} />
      <IcCheckedRound />
    </StSelectPictureWrapper>
  );
};

export default SelectPicture;

const StSelectPictureWrapper = styled.article<{ width: number }>`
  position: relative;
  height: 44.7rem;

  & > img {
    width: ${({ width }) => width}rem;
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
