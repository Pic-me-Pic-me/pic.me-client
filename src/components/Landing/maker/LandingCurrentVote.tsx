import styled from 'styled-components';

import { loading } from '../../common/style/animation';

const LandingCurrentVote = () => (
  <StLandingCurrentVoteWrapper>
    <StLandingVoteInfo>
      <span />
      <h1 />
    </StLandingVoteInfo>
    <StLandingVoteStatus />
    <article>
      <StLadingImgUl>
        <StLandingImg />
        <StLandingImg />
      </StLadingImgUl>
    </article>
    <StLandingDotWrapper>
      <StLandingDot />
      <StLandingDot />
    </StLandingDotWrapper>
    <StLandingCompleteVoteBtn />
  </StLandingCurrentVoteWrapper>
);

export default LandingCurrentVote;

const StLandingCurrentVoteWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  overflow: visible;

  padding: 0 2rem 0 2rem;
`;

const StLandingVoteInfo = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    width: 5.5rem;
    height: 1.5rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

    border-radius: 0.2rem;

    animation: ${loading} 2s infinite linear;
  }

  & > h1 {
    margin-top: 0.7rem;

    width: 22.9rem;
    height: 3rem;

    background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

    border-radius: 0.5rem;

    animation: ${loading} 2s infinite linear;
  }
`;

const StLandingVoteStatus = styled.section`
  width: 15.1rem;
  height: 2.7rem;

  margin-top: 0.8rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  border-radius: 3.26437rem;

  animation: ${loading} 2s infinite linear;
`;

const StLadingImgUl = styled.ul`
  display: flex;
  gap: 1.3rem;

  transform: translateX(13.75rem);
`;

const StLandingImg = styled.div`
  margin-top: 1.9rem;

  width: 32.5rem;
  height: 43.4rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  border-radius: 1.2rem;

  animation: ${loading} 2s infinite linear;
`;

const StLandingDotWrapper = styled.section`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.9rem;
`;

const StLandingDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  border-radius: 1.2rem;

  animation: ${loading} 2s infinite linear;
`;

const StLandingCompleteVoteBtn = styled.div`
  width: 100%;
  height: 6rem;

  margin: 2rem;

  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};

  border-radius: 0.9rem;

  animation: ${loading} 2s infinite linear;
`;
