import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcPlus } from '../asset/icon';
import { Header, Nav, VoteList } from '../components/Home';
import Footer from '../components/Home/Footer';
import { getAccessToken } from '../lib/token';
import { votingImageState } from '../recoil/maker/atom';

const Home = () => {
  const navigate = useNavigate();
  const setVotingForm = useSetRecoilState(votingImageState);

  console.log('home', getAccessToken('accessToken'));
  useEffect(() => {
    setVotingForm({ title: '', firstImageUrl: '', secondImageUrl: '' });
  }, []);

  return (
    <>
      <StHomeWrapper>
        <Nav />
        <Header />
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
  padding: 2.7rem 2rem 0rem 2rem;
`;

const StMakerVoting = styled.button`
  width: 100%;
  height: 12.4rem;
  padding: 0;
  margin-top: 1.5rem;
  border: none;
  border-radius: 1.2rem;
  background: inherit;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};
  > p {
    padding-top: 1.6rem;
    color: #5c5c5c;
    ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
  }
`;
