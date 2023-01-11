import styled from 'styled-components';

import { loading } from '../../common/style/animation';

const LadingSelectPicture = () => (
  <StSelectPictureWrapper>
    <p></p>
    <div className="check_round"></div>
  </StSelectPictureWrapper>
);

export default LadingSelectPicture;

const StSelectPictureWrapper = styled.article`
  position: relative;
  width: 80%;
  height: 44.7rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  border-radius: 1rem;

  animation: ${loading} 2s infinite linear;
  & > div {
    width: 100%;
    height: 44.7rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 1rem;

    animation: ${loading} 2s infinite linear;
  }
  .check_round {
    width: 3.2rem;
    height: 3.2rem;

    position: absolute;
    left: 15rem;
    bottom: -1.6rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    border-radius: 4rem;
  }
`;
