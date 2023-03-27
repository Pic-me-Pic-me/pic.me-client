import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcPlus } from '../asset/icon';
import { Footer, Header, Nav, VoteList } from '../components/Home';
import { votingImageState } from '../recoil/maker/atom';

const Home = () => {
  const navigate = useNavigate();
  const setVotingForm = useSetRecoilState(votingImageState);

  useEffect(() => {
    setVotingForm({ title: '', firstImageUrl: '', secondImageUrl: '' });
  }, []);

  return (
    <>
      <StHomeWrapper>
        <Nav />
        <Header />
        <StMakeVote>사진 투표 만들기</StMakeVote>
        <StMakerVoting
          type="button"
          onClick={() => {
            navigate('/makervoting');
          }}>
          <IcPlus />
          <p>투표 만들기</p>
        </StMakerVoting>
      </StHomeWrapper>
      <VoteList />
      <Footer />
    </>
  );
};

export default Home;

const StHomeWrapper = styled.div`
  padding: 2.7rem 1.7rem 0rem 1.7rem;
`;

const StMakeVote = styled.h1`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Noto_SB_Title_2};
`;

const StMakerVoting = styled.button`
  width: 100%;
  height: 12.4rem;
  padding: 0;
  margin-top: 0.8rem;
  border: none;
  border-radius: 1.2rem;
  background: inherit;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
  > p {
    padding-top: 1.037rem;
    color: #5c5c5c;
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_1};
  }
`;
